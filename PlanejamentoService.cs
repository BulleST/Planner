using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Org.BouncyCastle.Bcpg;
using Planner.Entities;
using Planner.Helper;
using Planner.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Planner.Services
{
    public interface IPlanejamentoServices
    {
        PlanejamentoResponse GetPlanejamento(int Cliente_Id);
        PlanejamentoResponse InsertPlanejamento(PlanejamentoResponse _PlanejamentoTotal);
        PlanejamentoResponse UpdatePlanejamento(PlanejamentoResponse _PlanejamentoTotal);
    }

    public class PlanejamentoServices : IPlanejamentoServices
    {
        private readonly AppSettings _appSettings;
        private readonly PlannerContext _db;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly Account _account;

        public PlanejamentoServices(IOptions<AppSettings> appSettings, PlannerContext db, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _appSettings = appSettings.Value;
            _db = db;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _account = (Account)_httpContextAccessor.HttpContext.Items["Account"];
        }

        public PlanejamentoResponse GetPlanejamento(int Cliente_Id)
        {
            Planejamento planejamento = _db.Planejamento
                .Include(x => x.Account)
                //.Include(x => x.Cliente)
                //.Include(x => x.Cliente).ThenInclude(x => x.PerfilInvestidor)
                //.Include(x => x.Cliente).ThenInclude(x => x.EstadoCivil)
                //.Include(x => x.Cliente).ThenInclude(x => x.Account)
                .Include(x => x.CarteiraSetup).ThenInclude(x => x.CarteiraProdutoRel)
                .Include(x => x.PlanejamentoInvestimento).ThenInclude(x => x.Investimento).ThenInclude(x => x.TipoLiquidez)
                .Include(x => x.PlanejamentoInvestimento).ThenInclude(x => x.Investimento).ThenInclude(x => x.TipoAtivo)
                .Include(x => x.PlanejamentoInvestimento).ThenInclude(x => x.Investimento).ThenInclude(x => x.TipoRisco)
                .Include(x => x.PlanejamentoProduto).ThenInclude(x => x.Produto).ThenInclude(x => x.TipoLiquidez)
                .Include(x => x.PlanejamentoProduto).ThenInclude(x => x.Produto).ThenInclude(x => x.TipoAtivo)
                .Include(x => x.PlanejamentoProduto).ThenInclude(x => x.Produto).ThenInclude(x => x.TipoRisco)
                .Include(x => x.PlanejamentoFluxosPontuais)
                .Include(x => x.PlanejamentoAgregandoValor)
                //.Include(x => x.PlanejamentoGrafico.OrderBy(x => x.Idade))
                .FirstOrDefault(x => x.Cliente_Id == Cliente_Id);
            //planejamento.Cliente.Account = planejamento.Account;

            Cliente cliente = _db.Cliente
                .Include(x => x.PerfilInvestidor)
                .Include(x => x.EstadoCivil)
                .Include(x => x.Account)
                .FirstOrDefault(x => x.Id == Cliente_Id);

            if (cliente == null)
                throw new AppException("Esse cliente não foi encontrado.");

            if (planejamento == null) // Se não houver nenhum planejamento para este cliente
            {
                planejamento = new Planejamento();
                planejamento.Cliente = cliente;
                planejamento.Cliente_Id = cliente.Id;
            }

            PlanejamentoResponse planejamentoTotal = new PlanejamentoResponse();
            planejamentoTotal = _mapper.Map<PlanejamentoResponse>(planejamento);

            var grafico = _db.PlanejamentoGrafico.Where(x => x.Planejamento_Id == planejamento.Id).ToList();

            planejamentoTotal.Cliente = _mapper.Map<ClienteResponse>(cliente);
            planejamentoTotal.PlanejamentoGrafico = _mapper.Map<List<PlanejamentoGraficoResponse>>(grafico);

            return planejamentoTotal;
        }

        public PlanejamentoResponse InsertPlanejamento(PlanejamentoResponse model)
        {
            //Verica se o RG ou CPF já está sendo usado em outro cadastro
            if (_db.Cliente.Any(x => x.Rg == model.Cliente.Rg && x.Id != model.Cliente_Id))
                throw new AppException("Já existe um registro com esse RG");
            if (_db.Cliente.Any(x => x.Cpf == model.Cliente.Cpf && x.Id != model.Cliente_Id))
                throw new AppException("Já existe um registro com esse CPF");

            //
            // Alocados por variaveis para facilitar a leitura e o comparativo com a planilha
            //

            //Taxas
            decimal? taxaSelic = model.TaxaSelic;
            decimal? taxaIPCA = model.TaxaIpca;

            //Despesas e receitas
            decimal? despesa = model.Cliente.Despesa;
            decimal? receita = model.Cliente.Receita;
            int? mesesReserva = model.Cliente.PerfilInvestidor.MesesReserva;

            //Calcula a reserva de emergência sugerida
            decimal? re_Sugerida = despesa * mesesReserva;

            //Somatório do montantes atual
            decimal? totalInvestimento_MontanteAtual = model.PlanejamentoInvestimento.Sum(i => i.MontanteAtual);
            decimal? totalProduto_PlanoAcao = model.PlanejamentoProduto.Sum(i => i.PlanoAcao);
            decimal? total_Montante = totalInvestimento_MontanteAtual; // + totalProduto;

            //Monta uma capacidade de risco para procurar os percentuais na tabela PercentualRisco
            //para calcular a sugestao de cada tipo de risco
            int capacidadeRisco_Id = 6;
            if (total_Montante < re_Sugerida) capacidadeRisco_Id = 1;
            else if (total_Montante <= (despesa * 12)) capacidadeRisco_Id = 2;
            else if (total_Montante <= (despesa * 24)) capacidadeRisco_Id = 3;
            else if (total_Montante <= (despesa * 42)) capacidadeRisco_Id = 4;
            else if (total_Montante <= (despesa * 60)) capacidadeRisco_Id = 5;

            PercentualRisco percentualRisco = _db.PercentualRisco
                .FirstOrDefault(p => p.Empresa_Id == model.Cliente.Empresa_Id
                && p.PerfilInvestidor_Id == model.Cliente.PerfilInvestidor_Id
                && p.CapacidadeRisco_Id == capacidadeRisco_Id);

            // SUGESTÃO
            //Calcula a sugestão para cada tipo de risco
            decimal? sugestao_Baixissimo = 0;
            decimal? sugestao_Baixo = 0;

            if (total_Montante > re_Sugerida)
            {
                sugestao_Baixissimo = re_Sugerida * (percentualRisco.Baixissimo / 100);
                sugestao_Baixo = re_Sugerida * (percentualRisco.Baixo / 100);
            }
            else
            {
                sugestao_Baixissimo = total_Montante * (percentualRisco.Baixissimo / 100);
                sugestao_Baixo = total_Montante * (percentualRisco.Baixo / 100);
            }

            decimal? diferenca = total_Montante - re_Sugerida;

            decimal? sugestao_Moderado =        diferenca * (percentualRisco.Moderado / 100);
            decimal? sugestao_Arrojado =        diferenca * (percentualRisco.Arrojado / 100);
            decimal? sugestao_SuperArrojado =   diferenca * (percentualRisco.SuperArrojado / 100);
            decimal? sugestao_Hedge =           diferenca * (percentualRisco.Hedge / 100);
            decimal? sugestao_Total = sugestao_Baixissimo + sugestao_Baixo + sugestao_Moderado + sugestao_Arrojado + sugestao_SuperArrojado + sugestao_Hedge;

            decimal? somaProduto_Sugerido = 0;

            if (model.CarteiraSetup_Id > 0)
            {
                var produtosExistentes = _db.PlanejamentoProduto.Where(x => x.Planejamento_Id == model.Id).ToList();
                _db.PlanejamentoProduto.RemoveRange(produtosExistentes);
                _db.SaveChanges();
                model.PlanejamentoProduto = new List<PlanejamentoProdutoResponse>();

                List<List_CarteiraProduto> cs = _db.List_CarteiraProduto.FromSqlRaw(@$"
					select 
			            prod.TipoRisco_Id
			            ,cart.Produto_Id
			            ,cart.Percentual
                    from 
                        CarteiraProduto_Rel cart
                        inner join Produto prod on prod.Id = cart.Produto_Id
                    where 
                        CarteiraSetup_Id = {model.CarteiraSetup.Id}
			        order by 
                        prod.TipoRisco_Id
                ").ToList();


                foreach (List_CarteiraProduto item in cs)
                {
                    PlanejamentoProdutoResponse _planProd = new PlanejamentoProdutoResponse();

                    Produto pd = _db.Produto.Find(item.Produto_Id);

                    decimal? sugeridoPlanejamentoProduto = 0;
                    decimal? percentualPlanejamentoProduto = 0;

                    switch (pd.TipoRisco_Id)
                    {
                        case 1:
                            //Baixissimo
                            sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Baixissimo);
                            percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Baixissimo)) / total_Montante;
                            break;
                        case 2:
                            //Baixo
                            sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Baixo);
                            percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Baixo)) / total_Montante;
                            break;
                        case 3:
                            //Moderado
                            sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Moderado);
                            percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Moderado)) / total_Montante;
                            break;
                        case 4:
                            //Arrojado
                            sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Arrojado);
                            percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Arrojado)) / total_Montante;
                            break;
                        case 5:
                            //Super Arrojado
                            sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_SuperArrojado);
                            percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_SuperArrojado)) / total_Montante;
                            break;
                        case 6:
                            //Hedge
                            sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Hedge);
                            percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Hedge)) / total_Montante;
                            break;
                    }

                    _planProd.Planejamento_Id = model.Id;
                    _planProd.Produto_Id = item.Produto_Id;
                    _planProd.Sugerido = sugeridoPlanejamentoProduto;
                    _planProd.Percentual = percentualPlanejamentoProduto * 100;
                    _planProd.CustosTaxas = 0;

                    model.PlanejamentoProduto.Add(_planProd);
                    somaProduto_Sugerido += sugeridoPlanejamentoProduto;

                }
            }

            var b = somaProduto_Sugerido;

            //Atualiza tabelas
            model.Cliente.Id = AtualizaCliente(model.Cliente);

            if (model.Id == 0)
            {
                Planejamento plan = new Planejamento();
                plan.Cliente_Id = model.Cliente.Id;
                plan.Account_Id = model.Account_Id;
                plan.Descricao = model.Descricao;
                plan.CarteiraSetup_Id = model.CarteiraSetup_Id;
                plan.Data = DateTime.Now;
                _db.Update(plan);
                _db.SaveChanges();
                model.Id = plan.Id;
            }

            List<PlanejamentoInvestimento> investimentosAtualizados = AtualizaInvestimento(model.PlanejamentoInvestimento, taxaSelic, model.Id);
            List<PlanejamentoProduto> produtosAtualizados = AtualizaProduto(model.PlanejamentoProduto, model.Id, total_Montante);
            AtualizaFluxosPontuais(model.PlanejamentoFluxosPontuais, model.Id);

            // PLANO
            // Somatório do sugerido, plano de ação e valor liquido
            decimal? totalInvestimento_Sugerido = investimentosAtualizados.Sum(i => i.Sugerido);
            decimal? totalProduto_Sugerido = produtosAtualizados.Sum(i => i.Sugerido);
            decimal? total_Sugerido = totalProduto_Sugerido; 

            decimal? totalInvestimento_Plano = investimentosAtualizados.Sum(i => i.PlanoAcao);
            decimal? totalProduto_Plano = produtosAtualizados.Sum(i => i.PlanoAcao);
            decimal? total_Plano = totalProduto_Plano;

            decimal? totalInvestimento_Liquido_MontanteAtual = investimentosAtualizados.Sum(i => i.ValorLiquido_MontanteAtual);
            decimal? totalProduto_Liquido_MontanteAtual = produtosAtualizados.Sum(i => i.ValorLiquido_MontanteAtual);
            decimal? total_Liquido_MontanteAtual = totalInvestimento_Liquido_MontanteAtual; 

            decimal? totalInvestimento_Liquido_PlanoAcao = investimentosAtualizados.Sum(i => i.ValorLiquido_PlanoAcao);
            decimal? totalProduto_Liquido_PlanoAcao = produtosAtualizados.Sum(i => i.ValorLiquido_PlanoAcao);
            decimal? total_Liquido_PlanoAcao = totalProduto_Liquido_PlanoAcao; 

            decimal? sobra = total_Montante - total_Plano;
            var produtoCC = produtosAtualizados.FirstOrDefault(x => x.Produto_Id == 61);
            produtoCC.Percentual = sobra > 0 ? sobra / total_Montante * 100 : 0;
            produtoCC.Sugerido = sobra;
            produtoCC.PlanoAcao = sobra;

            _db.PlanejamentoProduto.Update(produtoCC);
            _db.SaveChanges();

            Planejamento planejamento = _db.Planejamento
            .Include(x => x.Cliente)
            .Include(x => x.Cliente.PerfilInvestidor)
            .Include(x => x.Cliente.EstadoCivil)
            .Include(x => x.CarteiraSetup)
            .Include(x => x.PlanejamentoInvestimento)
            .Include(x => x.PlanejamentoInvestimento).ThenInclude(x => x.Investimento)
            .Include(x => x.PlanejamentoProduto).ThenInclude(x => x.Produto)
            .Include(x => x.PlanejamentoFluxosPontuais)
            .Include(x => x.PlanejamentoGrafico.OrderBy(x => x.Idade))
            .FirstOrDefault(x => x.Id == model.Id);

            //Calcula a plano para cada tipo de risco
            decimal? plano_Baixissimo = _db.PlanejamentoProduto.Where(p => p.Planejamento_Id == planejamento.Id && p.Produto.TipoRisco_Id == 1).Sum(i => i.Sugerido);
            decimal? plano_Baixo = _db.PlanejamentoProduto.Where(p => p.Planejamento_Id == planejamento.Id && p.Produto.TipoRisco_Id == 2).Sum(i => i.Sugerido);
            decimal? plano_Moderado = _db.PlanejamentoProduto.Where(p => p.Planejamento_Id == planejamento.Id && p.Produto.TipoRisco_Id == 3).Sum(i => i.Sugerido);
            decimal? plano_Arrojado = _db.PlanejamentoProduto.Where(p => p.Planejamento_Id == planejamento.Id && p.Produto.TipoRisco_Id == 4).Sum(i => i.Sugerido);
            decimal? plano_SuperArrojado = _db.PlanejamentoProduto.Where(p => p.Planejamento_Id == planejamento.Id && p.Produto.TipoRisco_Id == 5).Sum(i => i.Sugerido); // AJEITAR AQUI
            decimal? plano_Hedge = _db.PlanejamentoProduto.Where(p => p.Planejamento_Id == planejamento.Id && p.Produto.TipoRisco_Id == 6).Sum(i => i.Sugerido);
            decimal? plano_Total = plano_Baixissimo + plano_Baixo + plano_Moderado + plano_Arrojado + plano_SuperArrojado + plano_Hedge;

            //Riscos e reserva
            decimal? re_Planejado = plano_Baixissimo + plano_Baixo;

            var somaRiscoAlto = plano_Arrojado + plano_SuperArrojado;

            decimal? riscoAssumido = plano_Total == 0 || somaRiscoAlto == 0 ? 0 : ((somaRiscoAlto / plano_Total) * 100);

            decimal? riscoTolerado = planejamento.Cliente.PerfilInvestidor.RiscoMaximo;

            //Rentabilidade
            decimal? rentabilidadeMedia_MontanteAtual = total_Montante == 0 ? 0 : (total_Liquido_MontanteAtual / total_Montante) * 100;
            decimal? rentabilidadeReal_MontanteAtual = total_Montante == 0 ? 0 : (((1 + (total_Liquido_MontanteAtual / total_Montante)) * (1 - (taxaIPCA / 100))) - 1) * 100;

            decimal? rentabilidadeMedia_PlanoAcao = total_Plano == 0 ? 0 : (total_Liquido_PlanoAcao / total_Plano) * 100;
            decimal? rentabilidadeReal_PlanoAcao = total_Plano == 0 ? 0 : (((1 + (total_Liquido_PlanoAcao / total_Plano)) * (1 - (taxaIPCA / 100))) - 1) * 100;

            //Adicionando e salvando os dados
            planejamento.TaxaSelic = taxaSelic;
            planejamento.TaxaIpca = taxaIPCA;
            planejamento.RE_Sugerido = re_Sugerida;
            planejamento.RE_Planejado = re_Planejado;
            planejamento.RiscoAssumido = riscoAssumido;
            planejamento.RiscoTolerado = riscoTolerado;
            planejamento.Sugestao_Baixissimo = sugestao_Baixissimo;
            planejamento.Sugestao_Baixo = sugestao_Baixo;
            planejamento.Sugestao_Moderado = sugestao_Moderado;
            planejamento.Sugestao_Arrojado = sugestao_Arrojado;
            planejamento.Sugestao_SuperArrojado = sugestao_SuperArrojado;
            planejamento.Sugestao_Hedge = sugestao_Hedge;
            planejamento.Sugestao_Total = sugestao_Total;
            planejamento.Plano_Baixissimo = plano_Baixissimo;
            planejamento.Plano_Baixo = plano_Baixo;
            planejamento.Plano_Moderado = plano_Moderado;
            planejamento.Plano_Arrojado = plano_Arrojado;
            planejamento.Plano_SuperArrojado = plano_SuperArrojado;
            planejamento.Plano_Hedge = plano_Hedge;
            planejamento.Plano_Total = plano_Total;
            planejamento.Atual_Total = total_Montante;
            planejamento.Sugerido_Total = total_Sugerido;
            planejamento.PlanoAcao_Total = total_Plano;
            planejamento.Atual_RentabilidadeMedia = rentabilidadeMedia_MontanteAtual;
            planejamento.Atual_RentabilidadeReal = rentabilidadeReal_MontanteAtual;
            planejamento.PlanoAcao_RentabilidadeMedia = rentabilidadeMedia_PlanoAcao;
            planejamento.PlanoAcao_RentabilidadeReal = rentabilidadeReal_PlanoAcao;
            planejamento.CarteiraSetup_Id = model.CarteiraSetup_Id;
            planejamento.Account_Id = model.Account_Id;

            _db.Update(planejamento);
            _db.SaveChanges();

            AtualizaDadosGraficos(planejamento.Cliente, total_Montante, rentabilidadeReal_MontanteAtual, total_Plano, rentabilidadeReal_PlanoAcao, planejamento.Id);

            // Quadro agregando valor
            AtualizaAgregandoValor(planejamento);

            return GetPlanejamento(planejamento.Cliente_Id);
        }

        public PlanejamentoResponse UpdatePlanejamento(PlanejamentoResponse model)
        {
            //Verica se o RG ou CPF já está sendo usado em outro cadastro
            if (_db.Cliente.Any(x => x.Rg == model.Cliente.Rg && x.Id != model.Cliente_Id))
                throw new AppException("Já existe um registro com esse RG");
            if (_db.Cliente.Any(x => x.Cpf == model.Cliente.Cpf && x.Id != model.Cliente_Id))
                throw new AppException("Já existe um registro com esse CPF");

            // Valida soma do plano de acao dos produtos
            decimal soma = model.PlanejamentoProduto.Sum(x => x.PlanoAcao) ?? 0;
            if (soma != model.PlanejamentoAgregandoValor.Montante)
                throw new AppException($"A soma do plano de ação (R$ {soma}) dos produtos é diferente do montante (R$ {model.PlanejamentoAgregandoValor.Montante}).");

            //Alocados por variaveis para facilitar a leitura e o comparativo com a planilha
            if (model.Id == 0)
            {
                Planejamento plan = new Planejamento();
            }

            //Taxas
            decimal? taxaSelic = model.TaxaSelic;
            decimal? taxaIPCA = model.TaxaIpca;

            //Despesas e receitas
            decimal? despesa = model.Cliente.Despesa;
            decimal? receita = model.Cliente.Receita;
            int? mesesReserva = model.Cliente.PerfilInvestidor.MesesReserva;

            //Calcula a reserva de emergência sugerida
            decimal? re_Sugerida = despesa * mesesReserva;

            //Somatório do montantes atual
            decimal? totalInvestimento = model.PlanejamentoInvestimento.Sum(i => i.MontanteAtual);
            decimal? totalProduto = model.PlanejamentoProduto.Sum(i => i.PlanoAcao);
            decimal? total_MontanteAtual = totalInvestimento; //+ totalProduto;

            //Monta uma capacidade de risco para procurar os percentuais na tabela PercentualRisco
            //para calcular a sugestao de cada tipo de risco
            int capacidadeRisco_Id = 6;
            if (total_MontanteAtual < re_Sugerida) capacidadeRisco_Id = 1;
            else if (total_MontanteAtual <= (despesa * 12)) capacidadeRisco_Id = 2;
            else if (total_MontanteAtual <= (despesa * 24)) capacidadeRisco_Id = 3;
            else if (total_MontanteAtual <= (despesa * 42)) capacidadeRisco_Id = 4;
            else if (total_MontanteAtual <= (despesa * 60)) capacidadeRisco_Id = 5;

            PercentualRisco percentualRisco = _db.PercentualRisco
                .FirstOrDefault(p => p.Empresa_Id == model.Cliente.Empresa_Id
                && p.PerfilInvestidor_Id == model.Cliente.PerfilInvestidor_Id
                && p.CapacidadeRisco_Id == capacidadeRisco_Id);

            // SUGESTÃO
            //Calcula a sugestão para cada tipo de risco
            decimal? sugestao_Baixissimo = 0;
            decimal? sugestao_Baixo = 0;

            if (total_MontanteAtual > re_Sugerida)
            {
                sugestao_Baixissimo = re_Sugerida * (percentualRisco.Baixissimo / 100);
                sugestao_Baixo = re_Sugerida * (percentualRisco.Baixo / 100);
            }
            else
            {
                sugestao_Baixissimo = total_MontanteAtual * (percentualRisco.Baixissimo / 100);
                sugestao_Baixo = total_MontanteAtual * (percentualRisco.Baixo / 100);
            }

            // SUGESTÃO
            decimal? sugestao_Moderado = (total_MontanteAtual - re_Sugerida) * (percentualRisco.Moderado / 100);
            decimal? sugestao_Arrojado = (total_MontanteAtual - re_Sugerida) * (percentualRisco.Arrojado / 100);
            decimal? sugestao_SuperArrojado = (total_MontanteAtual - re_Sugerida) * (percentualRisco.SuperArrojado / 100);
            decimal? sugestao_Hedge = (total_MontanteAtual - re_Sugerida) * (percentualRisco.Hedge / 100);
            decimal? sugestao_Total = sugestao_Baixissimo + sugestao_Baixo + sugestao_Moderado + sugestao_Arrojado + sugestao_SuperArrojado + sugestao_Hedge;

            #region // comentario
            // //PrimeiroSetup
            // if (_PlanejamentoTotal.CarteiraSetup.Id > 0)
            // {
            //     List<List_CarteiraProduto> cs = _db.List_CarteiraProduto.FromSqlRaw(@$"
            //         select 
            //    prod.TipoRisco_Id
            //    ,cart.ProdutoTributacaoRel_Id
            //    ,prodTrib.Produto_Id
            //    ,prodTrib.Tributacao_Id
            //    ,cart.Percentual
            //         from 
            //             CarteiraProduto_Rel cart
            //             inner join ProdutoTributacao_Rel prodTrib on cart.ProdutoTributacaoRel_Id = prodTrib.Id
            //             inner join Produto prod on prod.Id = prodTrib.Produto_Id
            //         where 
            //             CarteiraSetup_Id = {_PlanejamentoTotal.CarteiraSetup.Id}
            //order by 
            //             prod.TipoRisco_Id
            //     ").ToList();

            //     foreach (List_CarteiraProduto item in cs)
            //     {
            //         PlanejamentoProdutoResponse _planProd = new PlanejamentoProdutoResponse();

            //         ProdutoTributacaoRel ptr = _db.ProdutoTributacaoRel.Find(item.ProdutoTributacaoRel_Id);
            //         Produto pd = _db.Produto.Find(ptr.Produto_Id);

            //         decimal? sugeridoPlanejamentoProduto = 0;
            //         decimal? percentualPlanejamentoProduto = 0;

            //         switch (pd.TipoRisco_Id)
            //         {
            //             case 1:
            //                 //Baixissimo
            //                 //75%
            //                 sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Baixissimo + sugestao_Baixo);
            //                 percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Baixissimo + sugestao_Baixo)) / total_MontanteAtual;
            //                 break;
            //             case 2:
            //                 //Baixo
            //                 sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Baixissimo + sugestao_Baixo);
            //                 percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Baixissimo + sugestao_Baixo)) / total_MontanteAtual;
            //                 break;
            //             case 3:
            //                 //Moderado
            //                 sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Moderado);
            //                 percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Moderado)) / total_MontanteAtual;
            //                 break;
            //             case 4:
            //                 //Arrojado
            //                 sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Arrojado);
            //                 percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Arrojado)) / total_MontanteAtual;
            //                 break;
            //             case 5:
            //                 //Super Arrojado
            //                 sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_SuperArrojado);
            //                 percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_SuperArrojado))/ total_MontanteAtual;
            //                 break;
            //             case 6:
            //                 //Hedge
            //                 sugeridoPlanejamentoProduto = (item.Percentual / 100) * (sugestao_Hedge);
            //                 percentualPlanejamentoProduto = ((item.Percentual / 100) * (sugestao_Hedge)) / total_MontanteAtual;
            //                 break;
            //         }

            //         _planProd.Planejamento_Id = _PlanejamentoTotal.Id;
            //         _planProd.ProdutoTributacao_Id = item.ProdutoTributacaoRel_Id;
            //         _planProd.Sugerido = sugeridoPlanejamentoProduto;
            //         _planProd.Percentual = percentualPlanejamentoProduto;

            //         _PlanejamentoTotal.PlanejamentoProduto.Add(_planProd);

            //     }
            // }

            #endregion

            //Atualiza tabelas
            AtualizaCliente(model.Cliente);
            AtualizaInvestimento(model.PlanejamentoInvestimento, taxaSelic, model.Id);
            AtualizaProduto(model.PlanejamentoProduto, model.Id, total_MontanteAtual);
            AtualizaFluxosPontuais(model.PlanejamentoFluxosPontuais, model.Id);

            Planejamento planejamento = _db.Planejamento
                .Include(x => x.Cliente)
                .Include(x => x.Cliente.PerfilInvestidor)
                .Include(x => x.Cliente.EstadoCivil)
                .Include(x => x.CarteiraSetup)
                .Include(x => x.PlanejamentoInvestimento)
                .Include(x => x.PlanejamentoInvestimento).ThenInclude(x => x.Investimento)
                .Include(x => x.PlanejamentoProduto).ThenInclude(x => x.Produto)
                .Include(x => x.PlanejamentoFluxosPontuais)
                .Include(x => x.PlanejamentoAgregandoValor)
                .Include(x => x.PlanejamentoGrafico.OrderBy(x => x.Idade))
                .FirstOrDefault(x => x.Id == model.Id);

            //Somatório do sugerido, plano de ação e valor liquido 
            decimal? totalInvestimento_Sugerido = planejamento.PlanejamentoInvestimento.Sum(i => i.Sugerido);
            decimal? totalProduto_Sugerido = planejamento.PlanejamentoProduto.Sum(i => i.Sugerido);
            decimal? total_Sugerido = totalProduto_Sugerido; //+ totalInvestimento_Sugerido;

            decimal? totalInvestimento_Plano = planejamento.PlanejamentoInvestimento.Sum(i => i.PlanoAcao);
            decimal? totalProduto_Plano = planejamento.PlanejamentoProduto.Sum(i => i.PlanoAcao);
            decimal? total_Plano = totalProduto_Plano; // + totalInvestimento_Plano;

            decimal? totalInvestimento_Liquido_MontanteAtual = planejamento.PlanejamentoInvestimento.Sum(i => i.ValorLiquido_MontanteAtual);
            decimal? totalProduto_Liquido_MontanteAtual = planejamento.PlanejamentoProduto.Sum(i => i.ValorLiquido_MontanteAtual);
            decimal? total_Liquido_MontanteAtual = totalInvestimento_Liquido_MontanteAtual; //+ totalProduto_Liquido_MontanteAtual;

            decimal? totalInvestimento_Liquido_PlanoAcao = planejamento.PlanejamentoInvestimento.Sum(i => i.ValorLiquido_PlanoAcao);
            decimal? totalProduto_Liquido_PlanoAcao = planejamento.PlanejamentoProduto.Sum(i => i.ValorLiquido_PlanoAcao);
            decimal? total_Liquido_PlanoAcao = totalProduto_Liquido_PlanoAcao; //+ totalInvestimento_Liquido_PlanoAcao;

            // PLANO
            //Calcula a plano para cada tipo de risco
            decimal? plano_Baixissimo = _db.PlanejamentoProduto.Where(p => p.Produto.TipoRisco_Id == 1 && p.Planejamento_Id == planejamento.Id).Sum(i => i.PlanoAcao);
            decimal? plano_Baixo = _db.PlanejamentoProduto.Where(p => p.Produto.TipoRisco_Id == 2 && p.Planejamento_Id == planejamento.Id).Sum(i => i.PlanoAcao);
            decimal? plano_Moderado = _db.PlanejamentoProduto.Where(p => p.Produto.TipoRisco_Id == 3 && p.Planejamento_Id == planejamento.Id).Sum(i => i.PlanoAcao);
            decimal? plano_Arrojado = _db.PlanejamentoProduto.Where(p => p.Produto.TipoRisco_Id == 4 && p.Planejamento_Id == planejamento.Id).Sum(i => i.PlanoAcao);
            decimal? plano_SuperArrojado = _db.PlanejamentoProduto.Where(p => p.Produto.TipoRisco_Id == 5 && p.Planejamento_Id == planejamento.Id).Sum(i => i.PlanoAcao);
            decimal? plano_Hedge = _db.PlanejamentoProduto.Where(p => p.Produto.TipoRisco_Id == 6 && p.Planejamento_Id == planejamento.Id).Sum(i => i.PlanoAcao);
            decimal? plano_Total = plano_Baixissimo + plano_Baixo + plano_Moderado + plano_Arrojado + plano_SuperArrojado + plano_Hedge;

            //Riscos e reserva
            decimal? re_Planejado = plano_Baixissimo + plano_Baixo;
            decimal? riscoAssumido = plano_Total == 0 ? 0 : ((plano_Arrojado + plano_SuperArrojado) / plano_Total) * 100;
            decimal? riscoTolerado = planejamento.Cliente.PerfilInvestidor.RiscoMaximo;

            //Rentabilidade
            decimal? rentabilidadeMedia_MontanteAtual = total_MontanteAtual == 0 ? 0 : (total_Liquido_MontanteAtual / total_MontanteAtual) * 100;
            decimal? rentabilidadeReal_MontanteAtual = total_MontanteAtual == 0 ? 0 : (((1 + (total_Liquido_MontanteAtual / total_MontanteAtual)) * (1 - (taxaIPCA / 100))) - 1) * 100;

            decimal? rentabilidadeMedia_PlanoAcao = total_Plano == 0 ? 0 : (total_Liquido_PlanoAcao / total_Plano) * 100;
            decimal? rentabilidadeReal_PlanoAcao = total_Plano == 0 ? 0 : (((1 + (total_Liquido_PlanoAcao / total_Plano)) * (1 - (taxaIPCA / 100))) - 1) * 100;

            //Adicionando e salvando os dados
            planejamento.TaxaSelic = taxaSelic;
            planejamento.TaxaIpca = taxaIPCA;
            planejamento.RE_Sugerido = re_Sugerida;
            planejamento.RE_Planejado = re_Planejado;
            planejamento.RiscoAssumido = riscoAssumido;
            planejamento.RiscoTolerado = riscoTolerado;
            planejamento.Sugestao_Baixissimo = sugestao_Baixissimo;
            planejamento.Sugestao_Baixo = sugestao_Baixo;
            planejamento.Sugestao_Moderado = sugestao_Moderado;
            planejamento.Sugestao_Arrojado = sugestao_Arrojado;
            planejamento.Sugestao_SuperArrojado = sugestao_SuperArrojado;
            planejamento.Sugestao_Hedge = sugestao_Hedge;
            planejamento.Sugestao_Total = sugestao_Total;
            planejamento.Plano_Baixissimo = plano_Baixissimo;
            planejamento.Plano_Baixo = plano_Baixo;
            planejamento.Plano_Moderado = plano_Moderado;
            planejamento.Plano_Arrojado = plano_Arrojado;
            planejamento.Plano_SuperArrojado = plano_SuperArrojado;
            planejamento.Plano_Hedge = plano_Hedge;
            planejamento.Plano_Total = plano_Total;
            planejamento.Atual_Total = total_MontanteAtual;
            planejamento.Sugerido_Total = total_Sugerido;
            planejamento.PlanoAcao_Total = total_Plano;
            planejamento.Atual_RentabilidadeMedia = rentabilidadeMedia_MontanteAtual;
            planejamento.Atual_RentabilidadeReal = rentabilidadeReal_MontanteAtual;
            planejamento.PlanoAcao_RentabilidadeMedia = rentabilidadeMedia_PlanoAcao;
            planejamento.PlanoAcao_RentabilidadeReal = rentabilidadeReal_PlanoAcao;
            planejamento.Descricao = model.Descricao;

            if (_account.PerfilAcesso_Id != 3)
                planejamento.Account_Id = model.Account_Id;

            _db.Update(planejamento);
            _db.SaveChanges();

            AtualizaDadosGraficos(planejamento.Cliente, total_MontanteAtual, rentabilidadeReal_MontanteAtual, total_Plano, rentabilidadeReal_PlanoAcao, planejamento.Id);

            // Quadro agregando valor
            AtualizaAgregandoValor(planejamento);

            return GetPlanejamento(planejamento.Cliente_Id);
        }

        private void AtualizaAgregandoValor(Planejamento plan)
        {
            PlanejamentoAgregandoValor valor = _db.PlanejamentoAgregandoValor.FirstOrDefault(p => p.Planejamento_Id == plan.Id);
            if (valor == null)
            {
                valor = new PlanejamentoAgregandoValor();
                valor.Planejamento_Id = plan.Id;
            }

            valor.RiscoAssumido = plan.RiscoAssumido;
            valor.Montante = plan.Atual_Total;

            valor.Rentabilidade_Atual = plan.Atual_RentabilidadeReal;
            valor.Rentabilidade_Sugerida = plan.PlanoAcao_RentabilidadeReal;
            valor.Rentabilidade_Diferenca = plan.PlanoAcao_RentabilidadeReal - plan.Atual_RentabilidadeReal;

            valor.RetornoAnual_Atual = plan.Atual_Total * (plan.Atual_RentabilidadeReal / 100);
            valor.RetornoAnual_Sugerido = plan.PlanoAcao_Total * (plan.PlanoAcao_RentabilidadeReal / 100);
            valor.RetornoAnual_Diferenca = valor.RetornoAnual_Sugerido - valor.RetornoAnual_Atual;

            valor.RetornoMensal_Atual = valor.RetornoAnual_Atual / 12;
            valor.RetornoMensal_Sugerido = valor.RetornoAnual_Sugerido / 12;
            valor.RetornoMensal_Diferenca = valor.RetornoMensal_Sugerido - valor.RetornoMensal_Atual;

            valor.PLMax_Atual = _db.PlanejamentoGrafico.Where(p => p.Planejamento_Id == plan.Id).Max(p => p.ValorAtual);
            valor.PLMax_Sugerido = _db.PlanejamentoGrafico.Where(p => p.Planejamento_Id == plan.Id).Max(p => p.ValorPlanejado);
            valor.PLMax_Diferenca = valor.PLMax_Sugerido - valor.PLMax_Atual;

            valor.IdadeMax_Atual = _db.PlanejamentoGrafico.Where(p => p.ValorAtual > 0 && p.Planejamento_Id == plan.Id).Max(p => p.Idade);
            valor.IdadeMax_Sugerido = _db.PlanejamentoGrafico.Where(p => p.ValorPlanejado > 0 && p.Planejamento_Id == plan.Id).Max(p => p.Idade);
            valor.IdadeMax_Diferenca = valor.IdadeMax_Sugerido - valor.IdadeMax_Atual;
                                  // Evitando dividir por 0
            valor.PL_Desempenho = valor.PLMax_Atual == 0 ? 0 : (valor.PLMax_Diferenca / valor.PLMax_Atual) * 100;
                                  // Evitando dividir por 0
            valor.Idade_Desempenho = valor.IdadeMax_Atual == 0 ? 0 : Convert.ToDecimal(((double)valor.IdadeMax_Diferenca / (double)valor.IdadeMax_Atual) * 100);

            _db.PlanejamentoAgregandoValor.Update(valor);
            _db.SaveChanges();
        }

        public void DeletePlanejamento(int Id)
        {
            Planejamento planejamento = _db.Planejamento
                    .Include(x => x.PlanejamentoInvestimento)
                    .Include(x => x.PlanejamentoProduto)
                    .Include(x => x.PlanejamentoFluxosPontuais)
                    .Include(x => x.PlanejamentoGrafico)
                    .Include(x => x.Cliente)
                    .FirstOrDefault(x => x.Id == Id);

            if (planejamento == null)
            {
                throw new AppException("Esse planejamento não existe.");
            }

            _db.PlanejamentoGrafico.RemoveRange(planejamento.PlanejamentoGrafico);
            _db.PlanejamentoFluxosPontuais.RemoveRange(planejamento.PlanejamentoFluxosPontuais);
            _db.PlanejamentoInvestimento.RemoveRange(planejamento.PlanejamentoInvestimento);
            _db.PlanejamentoProduto.RemoveRange(planejamento.PlanejamentoProduto);
            _db.Cliente.RemoveRange(planejamento.Cliente);
            _db.Planejamento.Remove(planejamento);
            _db.SaveChanges();

            return;
        }

        private int AtualizaCliente(ClienteResponse _cliente)
        {
            Cliente cliente = new Cliente();

            cliente.Id = _cliente.Id;
            cliente.DataDesativado = _cliente.DataDesativado;
            cliente.Account_Id = _cliente.Account_Id;
            cliente.Empresa_Id = _cliente.Empresa_Id;

            cliente.PerfilInvestidor_Id = _cliente.PerfilInvestidor_Id;
            cliente.Nome = _cliente.Nome;
            cliente.Idade = _cliente.Idade;
            cliente.Altura = _cliente.Altura;
            cliente.Peso = _cliente.Peso;
            cliente.EstadoCivil_Id = _cliente.EstadoCivil_Id;
            cliente.DataNascimento = _cliente.DataNascimento;
            cliente.Cpf = _cliente.Cpf;
            cliente.Rg = _cliente.Rg;
            cliente.Email = _cliente.Email;
            cliente.Imc = _cliente.Imc;
            cliente.Receita = _cliente.Receita;
            cliente.Despesa = _cliente.Despesa;
            cliente.IdadeAposentadoria = _cliente.IdadeAposentadoria;
            cliente.RendaMensalAposentadoria = _cliente.RendaMensalAposentadoria;
            cliente.RentabilidadeAposentadoria = _cliente.RentabilidadeAposentadoria;

            _db.Cliente.Update(cliente);
            _db.SaveChanges();

            return cliente.Id;
        }

        private List<PlanejamentoInvestimento> AtualizaInvestimento(ICollection<PlanejamentoInvestimentoResponse> planejamentoInvestimento, decimal? taxaSelic, int planejamento_Id)
        {
            List<int> ids = new List<int>();
            List<PlanejamentoInvestimento> investimentos = planejamentoInvestimento.Select(x =>
            {
                decimal? rentabilidadeLiquida = 0;
                PlanejamentoInvestimento investimento = _db.PlanejamentoInvestimento.Find(x.Id);

                if (investimento == null)
                    investimento = new PlanejamentoInvestimento();

                rentabilidadeLiquida = ((x.Rentabilidade ?? 0) / 100) * (1 - ((x.CustosTaxas ?? 0) / 100));
                investimento.Planejamento_Id = planejamento_Id;
                investimento.Investimento_Id = x.Investimento_Id;
                investimento.Rentabilidade = x.Rentabilidade;
                investimento.RentabilidadeLiquida = rentabilidadeLiquida * 100;
                investimento.MontanteAtual = x.MontanteAtual;
                investimento.Sugerido = x.Sugerido;
                investimento.PlanoAcao = x.PlanoAcao;
                investimento.CustosTaxas = x.CustosTaxas;
                investimento.ValorLiquido_MontanteAtual = x.MontanteAtual * (rentabilidadeLiquida);
                investimento.ValorLiquido_PlanoAcao = x.PlanoAcao * (rentabilidadeLiquida);
                return investimento;

            }).ToList();

            _db.PlanejamentoInvestimento.UpdateRange(investimentos);

            int[] idsExistentes = investimentos.Select(x => x.Id).ToArray();
            List<PlanejamentoInvestimento> remover = _db.PlanejamentoInvestimento.Where(p => !idsExistentes.Contains(p.Id) && p.Planejamento_Id == planejamento_Id).ToList();
            _db.PlanejamentoInvestimento.RemoveRange(remover);
            _db.SaveChanges();
            return investimentos;
        }

        private List<PlanejamentoProduto> AtualizaProduto(ICollection<PlanejamentoProdutoResponse> planejamentoProduto, int planejamento_Id, decimal? total_MontanteAtual)
        {
            List<PlanejamentoProduto> produtos = planejamentoProduto.Select(planProdResp =>
            {
                decimal? rentabilidadeLiquida = 0;

                PlanejamentoProduto planProd = _db.PlanejamentoProduto.Find(planProdResp.Id);
                if (planProd == null)
                    planProd = new PlanejamentoProduto();

                planProd.Id = planProdResp.Id;
                planProd.Planejamento_Id = planejamento_Id;
                planProd.Produto_Id = planProdResp.Produto_Id;
                planProd.Rentabilidade = planProdResp.Rentabilidade ?? 0;
                planProd.MontanteAtual = planProdResp.MontanteAtual ?? 0;
                planProd.CustosTaxas = planProdResp.CustosTaxas ?? 0;
                planProd.Sugerido = planProdResp.Sugerido ?? total_MontanteAtual * (planProdResp.Percentual / 100);
                planProd.PlanoAcao = planProdResp.PlanoAcao ?? planProd.Sugerido; // total_MontanteAtual * (planProdResp.Percentual / 100);
                planProd.Percentual = Math.Round(((planProd.PlanoAcao / total_MontanteAtual) * 100).Value, 2);
                rentabilidadeLiquida = ((planProdResp.Rentabilidade ?? 0) / 100) * (1 - ((planProd.CustosTaxas) / 100));
                planProd.RentabilidadeLiquida = (rentabilidadeLiquida ?? 0) * 100;

                planProd.ValorLiquido_MontanteAtual = planProd.MontanteAtual * (rentabilidadeLiquida);
                planProd.ValorLiquido_PlanoAcao = planProd.PlanoAcao * (rentabilidadeLiquida);

                return planProd;

            }).ToList();

            _db.PlanejamentoProduto.UpdateRange(produtos);

            //Remove produtos que nao vieram no objeto
            int[] idExistentes = produtos.Select(x => x.Id).Where(x => x != 0).ToArray();
            List<PlanejamentoProduto> remover = _db.PlanejamentoProduto.Where(p => !idExistentes.Contains(p.Id) && p.Planejamento_Id == planejamento_Id).ToList();
            //List<PlanejamentoProduto> remover = _db.PlanejamentoProduto.Where(p => p.Planejamento_Id == planejamento_Id).ToList();
            _db.PlanejamentoProduto.RemoveRange(remover);
            _db.SaveChanges();

            return produtos;

        }

        private void AtualizaFluxosPontuais(ICollection<PlanejamentoFluxosPontuaisResponse> planejamentoFluxosPontuais, int planejamento_Id)
        {
            List<PlanejamentoFluxosPontuais> fluxos = planejamentoFluxosPontuais
                .Select(x => new PlanejamentoFluxosPontuais()
                {
                    Id = x.Id,
                    Planejamento_Id = planejamento_Id,
                    Idade = x.Idade,
                    Valor = x.Valor,

                }).ToList();
            _db.UpdateRange(fluxos);
            _db.SaveChanges();

            //Remove fluxos pontuais que nao vieram no objeto
            int[] idExistentes = fluxos.Select(x => x.Id).ToArray();
            List<PlanejamentoFluxosPontuais> remover = _db.PlanejamentoFluxosPontuais.Where(p => !idExistentes.Contains(p.Id) && p.Planejamento_Id == planejamento_Id).ToList();
            _db.RemoveRange(remover);
            _db.SaveChanges();
        }

        private void AtualizaDadosGraficos(Cliente _cliente, decimal? total_MontanteAtual, decimal? rentabilidadeReal_MontanteAtual, decimal? total_Plano, decimal? rentabilidadeReal_PlanoAcao, int planejamentoId)
        {

            //Calculo para gráfico
            /*
             idade < idade aposentado
            =Principal + fluxo*((1+rentabilidade)^dif tempo) + aporte

            idade > idade aposentado
            =Principal + fluxo*((1+rentabilidade aposentadoria)^dif tempo) - renda mensal
            */

            var grafico = _db.PlanejamentoGrafico.Where(p => p.Planejamento_Id == planejamentoId);
            if (grafico != null)
            {
                _db.RemoveRange(grafico);
                _db.SaveChanges();
            }

            double aporte = Convert.ToDouble((_cliente.Receita - _cliente.Despesa) * 12);
            int? idade = _cliente.Idade;
            int? idadeAposentadoria = _cliente.IdadeAposentadoria;

            double rendaMensalAposentadoria = Convert.ToDouble(_cliente.RendaMensalAposentadoria);
            double rentabilidadeAposentadoria = 1 + (Convert.ToDouble(_cliente.RentabilidadeAposentadoria) / 100);

            int? contadorIdade = idade;
            double valorGrafico_Atual = Convert.ToDouble(total_MontanteAtual);
            double valorGrafico_Planejado = Convert.ToDouble(total_Plano);
            double fluxo = 0;
            double rateAtual = 1 + (Convert.ToDouble(rentabilidadeReal_MontanteAtual) / 100);
            double ratePlanejado = 1 + (Convert.ToDouble(rentabilidadeReal_PlanoAcao) / 100);

            PlanejamentoGrafico g = new PlanejamentoGrafico();

            while (contadorIdade <= idadeAposentadoria)
            {
                if (contadorIdade == idade)
                {
                    try
                    {
                        var a = Convert.ToDouble(valorGrafico_Atual);
                        var b = Convert.ToDouble(valorGrafico_Planejado);

                        g = new PlanejamentoGrafico();
                        g.Planejamento_Id = planejamentoId;
                        g.Idade = contadorIdade;
                        g.ValorAtual = Convert.ToDouble(valorGrafico_Atual);
                        g.ValorPlanejado = Convert.ToDouble(valorGrafico_Planejado);
                    }
                    catch (Exception e)
                    {

                    }
                    try
                    {
                        _db.Update(g);
                    }
                    catch (Exception e)
                    {

                    }
                    contadorIdade++;
                }

                try
                {
                    PlanejamentoFluxosPontuais pontuais = _db.PlanejamentoFluxosPontuais.FirstOrDefault(p => p.Idade == contadorIdade);
                    if (pontuais != null)
                        fluxo = Convert.ToDouble(pontuais.Valor.Value);
                    else
                        fluxo = 0;
                    //= Principal + fluxo * ((1 + rentabilidade) ^ dif tempo)+aporte
                    valorGrafico_Atual = Math.Round((valorGrafico_Atual + aporte + fluxo) * (Math.Pow(rateAtual, 1)), 4);
                    valorGrafico_Planejado = (valorGrafico_Planejado + aporte + fluxo) * (Math.Pow(ratePlanejado, 1));

                    var a = Convert.ToDouble(valorGrafico_Atual);
                    var b = Convert.ToDouble(valorGrafico_Planejado);

                    g = new PlanejamentoGrafico();
                    g.Idade = contadorIdade;
                    g.Planejamento_Id = planejamentoId;

                    //Evita valores negativos
                    if (valorGrafico_Atual < 0)
                        valorGrafico_Atual = 0;

                    if (valorGrafico_Planejado < 0)
                        valorGrafico_Planejado = 0;

                    g.ValorAtual = Convert.ToDouble(valorGrafico_Atual);
                    g.ValorPlanejado = Convert.ToDouble(valorGrafico_Planejado);
                }
                catch (Exception e)
                {

                }

                //Sai do loop pra que o gráfico pare de gerar valores
                if (valorGrafico_Atual == 0 && valorGrafico_Planejado == 0)
                    break;

                try
                {
                    _db.Update(g);
                }
                catch (Exception e)
                {

                }
                contadorIdade++;
            }

            while (contadorIdade >= idadeAposentadoria && contadorIdade <= 120)
            {
                PlanejamentoFluxosPontuais pontuais = _db.PlanejamentoFluxosPontuais.FirstOrDefault(p => p.Idade == contadorIdade);
                if (pontuais != null)
                    fluxo = Convert.ToDouble(pontuais.Valor.Value);
                else
                    fluxo = 0;

                valorGrafico_Atual = (valorGrafico_Atual - rendaMensalAposentadoria * 12 + fluxo) * (Math.Pow(rentabilidadeAposentadoria, 1));
                valorGrafico_Planejado = (valorGrafico_Planejado - rendaMensalAposentadoria * 12 + fluxo) * (Math.Pow(rentabilidadeAposentadoria, 1));

                g = new PlanejamentoGrafico();
                g.Idade = contadorIdade;
                g.Planejamento_Id = planejamentoId;

                //Evita valores negativos
                if (valorGrafico_Atual < 0)
                    valorGrafico_Atual = 0;
                if (valorGrafico_Planejado < 0)
                    valorGrafico_Planejado = 0;

                g.ValorAtual = Convert.ToDouble(valorGrafico_Atual);
                g.ValorPlanejado = Convert.ToDouble(valorGrafico_Planejado);

                try
                {
                    _db.Update(g);
                }
                catch (Exception e)
                {

                }

                //Sai do loop pra que o gráfico pare de gerar valores
                if (valorGrafico_Atual == 0 && valorGrafico_Planejado == 0)
                    break;

                contadorIdade++;
            }

            try
            {
                _db.SaveChanges();
            }
            catch (Exception e)
            {

            }
        }
    }
}
