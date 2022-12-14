USE [master]
GO
/****** Object:  Database [Planner]    Script Date: 02/08/2022 08:14:20 ******/
CREATE DATABASE [Planner]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Planner', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Planner.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Planner_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Planner_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Planner] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Planner].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Planner] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Planner] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Planner] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Planner] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Planner] SET ARITHABORT OFF 
GO
ALTER DATABASE [Planner] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Planner] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Planner] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Planner] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Planner] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Planner] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Planner] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Planner] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Planner] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Planner] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Planner] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Planner] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Planner] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Planner] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Planner] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Planner] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Planner] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Planner] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Planner] SET  MULTI_USER 
GO
ALTER DATABASE [Planner] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Planner] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Planner] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Planner] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Planner] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Planner] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Planner] SET QUERY_STORE = OFF
GO
USE [Planner]
GO
/****** Object:  Table [dbo].[CarteiraProduto_Rel]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarteiraProduto_Rel](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CarteiraSetup_Id] [int] NOT NULL,
	[ProdutoTributacao_Id] [int] NOT NULL,
	[Percentual] [decimal](18, 8) NOT NULL,
 CONSTRAINT [PK_CarteiraProduto_Rel] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarteiraSetup]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarteiraSetup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Empresa_Id] [int] NOT NULL,
	[Nome] [varchar](50) NOT NULL,
 CONSTRAINT [PK_CarteiraSetup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Empresa_Id] [int] NULL,
	[PerfilInvestidor_Id] [int] NULL,
	[Nome] [varchar](50) NULL,
	[Idade] [int] NULL,
	[Altura] [decimal](18, 8) NULL,
	[Peso] [decimal](18, 8) NULL,
	[EstadoCivil_Id] [int] NULL,
	[DataNascimento] [nchar](10) NULL,
	[CPF] [decimal](12, 0) NULL,
	[RG] [decimal](11, 0) NULL,
	[Email] [varchar](50) NULL,
	[IMC] [decimal](18, 8) NULL,
	[Receita] [decimal](18, 8) NULL,
	[Despesa] [decimal](18, 8) NULL,
	[IdadeAposentadoria] [int] NULL,
	[RendaMensalAposentadoria] [decimal](18, 8) NULL,
	[RentabilidadeAposentadoria] [decimal](18, 8) NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empresa]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empresa](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](250) NULL,
	[CNPJ] [decimal](14, 0) NULL,
	[Email] [varchar](250) NULL,
 CONSTRAINT [PK_Empresa] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EstadoCivil]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadoCivil](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descricao] [varchar](50) NOT NULL,
 CONSTRAINT [PK_EstadoCivil] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Investimento]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Investimento](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TipoAtivo_Id] [int] NOT NULL,
	[TipoRisco_Id] [int] NOT NULL,
	[TipoLiquidez_Id] [int] NOT NULL,
	[Descricao] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Investimento] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InvestimentoTributacao_Rel]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvestimentoTributacao_Rel](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Investimento_Id] [int] NOT NULL,
	[Tributacao_Id] [int] NOT NULL,
 CONSTRAINT [PK_InvestimentoTributacao_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PercentualRisco]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PercentualRisco](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Empresa_Id] [int] NOT NULL,
	[CapacidadeRisco_Id] [int] NOT NULL,
	[PerfilInvestidor_Id] [int] NOT NULL,
	[Baixissimo] [decimal](18, 8) NOT NULL,
	[Baixo] [decimal](18, 8) NOT NULL,
	[Moderado] [decimal](18, 8) NOT NULL,
	[Arrojado] [decimal](18, 8) NOT NULL,
	[SuperArrojado] [decimal](18, 8) NOT NULL,
	[Hedge] [decimal](18, 8) NOT NULL,
 CONSTRAINT [PK_PercentualRisco] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PerfilAcesso]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PerfilAcesso](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Perfil] [varchar](50) NULL,
 CONSTRAINT [PK_PerfilAcesso] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PerfilInvestidor]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PerfilInvestidor](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descricao] [varchar](50) NOT NULL,
	[RiscoMaximo] [int] NOT NULL,
	[MesesReserva] [int] NOT NULL,
 CONSTRAINT [PK_PerfilInvestidor] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Planejamento]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Planejamento](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Cliente_Id] [int] NOT NULL,
	[Usuario_Id] [int] NOT NULL,
	[CarteiraSetup_Id] [int] NULL,
	[Data] [date] NOT NULL,
	[Descricao] [varchar](50) NOT NULL,
	[TaxaSelic] [decimal](18, 8) NULL,
	[TaxaIPCA] [decimal](18, 8) NULL,
	[CM] [bit] NULL,
	[RE_Sugerido] [decimal](18, 8) NULL,
	[RE_Planejado] [decimal](18, 8) NULL,
	[RiscoAssumido] [decimal](18, 8) NULL,
	[RiscoTolerado] [decimal](18, 8) NULL,
	[Sugestao_Baixissimo] [decimal](18, 8) NULL,
	[Sugestao_Baixo] [decimal](18, 8) NULL,
	[Sugestao_Moderado] [decimal](18, 8) NULL,
	[Sugestao_Arrojado] [decimal](18, 8) NULL,
	[Sugestao_SuperArrojado] [decimal](18, 8) NULL,
	[Sugestao_Hedge] [decimal](18, 8) NULL,
	[Sugestao_Total] [decimal](18, 8) NULL,
	[Plano_Baixissimo] [decimal](18, 8) NULL,
	[Plano_Baixo] [decimal](18, 8) NULL,
	[Plano_Moderado] [decimal](18, 8) NULL,
	[Plano_Arrojado] [decimal](18, 8) NULL,
	[Plano_SuperArrojado] [decimal](18, 8) NULL,
	[Plano_Hedge] [decimal](18, 8) NULL,
	[Plano_Total] [decimal](18, 8) NULL,
	[Atual_Total] [decimal](18, 8) NULL,
	[Sugerido_Total] [decimal](18, 8) NULL,
	[PlanoAcao_Total] [decimal](18, 8) NULL,
	[Atual_RentabilidadeMedia] [decimal](18, 8) NULL,
	[Atual_RentabilidadeReal] [decimal](18, 8) NULL,
	[PlanoAcao_RentabilidadeMedia] [decimal](18, 8) NULL,
	[PlanoAcao_RentabilidadeReal] [decimal](18, 8) NULL,
 CONSTRAINT [PK_Planner] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PlanejamentoFluxosPontuais]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PlanejamentoFluxosPontuais](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Planejamento_Id] [int] NOT NULL,
	[Idade] [int] NOT NULL,
	[Valor] [decimal](18, 8) NOT NULL,
 CONSTRAINT [PK_PlanejamentoFluxosPontuais] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PlanejamentoGrafico]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PlanejamentoGrafico](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Planejamento_Id] [int] NOT NULL,
	[Idade] [int] NULL,
	[ValorAtual] [decimal](18, 8) NULL,
	[ValorPlanejado] [decimal](18, 8) NULL,
 CONSTRAINT [PK_PlanejamentoGrafico] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PlanejamentoInvestimento]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PlanejamentoInvestimento](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Planejamento_Id] [int] NOT NULL,
	[InvestimentoTributacao_Id] [int] NULL,
	[Rentabilidade] [decimal](18, 8) NULL,
	[RentabilidadeLiquida] [decimal](18, 8) NULL,
	[MontanteAtual] [decimal](18, 8) NULL,
	[Sugerido] [decimal](18, 8) NULL,
	[PlanoAcao] [decimal](18, 8) NULL,
	[ValorLiquido_MontanteAtual] [decimal](18, 8) NULL,
	[ValorLiquido_PlanoAcao] [decimal](18, 8) NULL,
 CONSTRAINT [PK_PlanejamentoInvestimento] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PlanejamentoProduto]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PlanejamentoProduto](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Planejamento_Id] [int] NOT NULL,
	[ProdutoTributacao_Id] [int] NULL,
	[Rentabilidade] [decimal](18, 8) NULL,
	[RentabilidadeLiquida] [decimal](18, 8) NULL,
	[MontanteAtual] [decimal](18, 8) NULL,
	[Sugerido] [decimal](18, 8) NULL,
	[PlanoAcao] [decimal](18, 8) NULL,
	[ValorLiquido_MontanteAtual] [decimal](18, 8) NULL,
	[ValorLiquido_PlanoAcao] [decimal](18, 8) NULL,
 CONSTRAINT [PK_PlanejamentoProduto] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Produto]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Produto](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Empresa_Id] [int] NOT NULL,
	[TipoAtivo_Id] [int] NOT NULL,
	[TipoRisco_Id] [int] NOT NULL,
	[TipoLiquidez_Id] [int] NOT NULL,
	[Descricao] [varchar](50) NOT NULL,
	[TaxaADM] [decimal](18, 8) NOT NULL,
	[TaxaPfee] [decimal](18, 8) NOT NULL,
	[CM] [bit] NULL,
 CONSTRAINT [PK_Produtos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProdutoTributacao_Rel]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProdutoTributacao_Rel](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Produto_Id] [int] NOT NULL,
	[Tributacao_Id] [int] NOT NULL,
 CONSTRAINT [PK_ProdutoTributacao_Rel] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Taxas]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Taxas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descricao] [varchar](50) NOT NULL,
	[Valor] [decimal](18, 8) NOT NULL,
 CONSTRAINT [PK_Taxas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoAtivo]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoAtivo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TipoAtivo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoLiquidez]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoLiquidez](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TipoLiquidez] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoRisco]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoRisco](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ProdutoRisco] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tributacao]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tributacao](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descricao] [varchar](50) NOT NULL,
	[Aliquota] [decimal](18, 8) NOT NULL,
 CONSTRAINT [PK_Tributacao] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 02/08/2022 08:14:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Empresa_Id] [int] NULL,
	[Perfil_Id] [int] NULL,
	[Nome] [varchar](50) NULL,
	[Senha] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CarteiraProduto_Rel] ON 

INSERT [dbo].[CarteiraProduto_Rel] ([Id], [CarteiraSetup_Id], [ProdutoTributacao_Id], [Percentual]) VALUES (1, 1, 1, CAST(50.00000000 AS Decimal(18, 8)))
INSERT [dbo].[CarteiraProduto_Rel] ([Id], [CarteiraSetup_Id], [ProdutoTributacao_Id], [Percentual]) VALUES (2, 1, 6, CAST(50.00000000 AS Decimal(18, 8)))
INSERT [dbo].[CarteiraProduto_Rel] ([Id], [CarteiraSetup_Id], [ProdutoTributacao_Id], [Percentual]) VALUES (3, 1, 11, CAST(40.00000000 AS Decimal(18, 8)))
INSERT [dbo].[CarteiraProduto_Rel] ([Id], [CarteiraSetup_Id], [ProdutoTributacao_Id], [Percentual]) VALUES (4, 1, 18, CAST(40.00000000 AS Decimal(18, 8)))
INSERT [dbo].[CarteiraProduto_Rel] ([Id], [CarteiraSetup_Id], [ProdutoTributacao_Id], [Percentual]) VALUES (5, 1, 19, CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[CarteiraProduto_Rel] ([Id], [CarteiraSetup_Id], [ProdutoTributacao_Id], [Percentual]) VALUES (6, 1, 15, CAST(100.00000000 AS Decimal(18, 8)))
INSERT [dbo].[CarteiraProduto_Rel] ([Id], [CarteiraSetup_Id], [ProdutoTributacao_Id], [Percentual]) VALUES (7, 1, 17, CAST(100.00000000 AS Decimal(18, 8)))
INSERT [dbo].[CarteiraProduto_Rel] ([Id], [CarteiraSetup_Id], [ProdutoTributacao_Id], [Percentual]) VALUES (8, 1, 21, CAST(100.00000000 AS Decimal(18, 8)))
SET IDENTITY_INSERT [dbo].[CarteiraProduto_Rel] OFF
GO
SET IDENTITY_INSERT [dbo].[CarteiraSetup] ON 

INSERT [dbo].[CarteiraSetup] ([Id], [Empresa_Id], [Nome]) VALUES (1, 1, N'Primeiro Setup')
SET IDENTITY_INSERT [dbo].[CarteiraSetup] OFF
GO
SET IDENTITY_INSERT [dbo].[Cliente] ON 

INSERT [dbo].[Cliente] ([Id], [Empresa_Id], [PerfilInvestidor_Id], [Nome], [Idade], [Altura], [Peso], [EstadoCivil_Id], [DataNascimento], [CPF], [RG], [Email], [IMC], [Receita], [Despesa], [IdadeAposentadoria], [RendaMensalAposentadoria], [RentabilidadeAposentadoria]) VALUES (1, 1, 4, N'Fulano', 30, CAST(1.72000000 AS Decimal(18, 8)), CAST(60.00000000 AS Decimal(18, 8)), 1, N'1990-01-01', CAST(25426598856 AS Decimal(12, 0)), CAST(15669877 AS Decimal(11, 0)), N'fulano@teste.com.br', NULL, CAST(10000.00000000 AS Decimal(18, 8)), CAST(8000.00000000 AS Decimal(18, 8)), 60, CAST(10000.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
SET IDENTITY_INSERT [dbo].[Cliente] OFF
GO
SET IDENTITY_INSERT [dbo].[Empresa] ON 

INSERT [dbo].[Empresa] ([Id], [Nome], [CNPJ], [Email]) VALUES (1, N'BulleST', CAST(123456000165 AS Decimal(14, 0)), N'bullest@bullest.com.br')
INSERT [dbo].[Empresa] ([Id], [Nome], [CNPJ], [Email]) VALUES (3, N'Planner', CAST(223456000168 AS Decimal(14, 0)), N'planner@planner.com.br')
SET IDENTITY_INSERT [dbo].[Empresa] OFF
GO
SET IDENTITY_INSERT [dbo].[EstadoCivil] ON 

INSERT [dbo].[EstadoCivil] ([Id], [Descricao]) VALUES (1, N'Solteiro(a)')
INSERT [dbo].[EstadoCivil] ([Id], [Descricao]) VALUES (2, N'Casado(a) (Comunhão Parcial)')
INSERT [dbo].[EstadoCivil] ([Id], [Descricao]) VALUES (3, N'Casado(a) (Comunhão Universal)')
INSERT [dbo].[EstadoCivil] ([Id], [Descricao]) VALUES (4, N'Casado(a) (Separação Total)')
INSERT [dbo].[EstadoCivil] ([Id], [Descricao]) VALUES (5, N'União Estável')
INSERT [dbo].[EstadoCivil] ([Id], [Descricao]) VALUES (6, N'Viúvo(a)')
SET IDENTITY_INSERT [dbo].[EstadoCivil] OFF
GO
SET IDENTITY_INSERT [dbo].[Investimento] ON 

INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (1, 1, 1, 1, N'Poupança')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (2, 1, 1, 1, N'Tesouro')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (3, 1, 1, 1, N'RF (CDB/LCI/LCA)')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (4, 1, 2, 3, N'Previdência (VGBL)')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (5, 1, 2, 3, N'Debêntures/COE')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (6, 1, 2, 2, N'Fundo RF')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (7, 1, 2, 4, N'FII')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (8, 2, 3, 4, N'FIM/FIC e afins')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (9, 2, 4, 4, N'FIA')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (10, 2, 4, 4, N'Ações')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (11, 1, 2, 5, N'Imóveis (Aluguel)')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (12, 3, 6, 4, N'Dólar/Ouro')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (13, 2, 5, 1, N'Criptoativos')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (14, 2, 5, 2, N'Outros')
INSERT [dbo].[Investimento] ([Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao]) VALUES (15, 1, 2, 3, N'Previdência (PGBL)')
SET IDENTITY_INSERT [dbo].[Investimento] OFF
GO
SET IDENTITY_INSERT [dbo].[InvestimentoTributacao_Rel] ON 

INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (1, 2, 1)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (2, 2, 2)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (3, 2, 3)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (4, 2, 4)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (5, 3, 1)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (6, 3, 2)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (7, 3, 3)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (8, 3, 4)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (9, 5, 1)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (10, 5, 2)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (11, 5, 3)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (12, 5, 4)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (13, 6, 1)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (14, 6, 2)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (15, 6, 3)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (16, 6, 4)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (17, 7, 7)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (18, 7, 8)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (19, 10, 5)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (20, 10, 6)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (21, 4, 9)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (22, 4, 10)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (23, 4, 11)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (24, 4, 12)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (25, 4, 13)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (26, 4, 14)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (27, 4, 15)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (28, 4, 16)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (29, 4, 17)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (30, 4, 18)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (31, 4, 19)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (32, 15, 20)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (33, 15, 21)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (34, 15, 22)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (35, 15, 23)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (36, 15, 24)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (37, 15, 25)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (38, 15, 26)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (39, 15, 27)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (40, 15, 28)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (41, 15, 29)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (42, 15, 30)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (43, 11, 31)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (44, 11, 32)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (45, 11, 33)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (46, 11, 34)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (47, 11, 35)
INSERT [dbo].[InvestimentoTributacao_Rel] ([Id], [Investimento_Id], [Tributacao_Id]) VALUES (48, 1, 36)
SET IDENTITY_INSERT [dbo].[InvestimentoTributacao_Rel] OFF
GO
SET IDENTITY_INSERT [dbo].[PercentualRisco] ON 

INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (1, 1, 1, 1, CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (2, 1, 1, 2, CAST(80.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (3, 1, 1, 3, CAST(50.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (4, 1, 1, 4, CAST(20.00000000 AS Decimal(18, 8)), CAST(80.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (5, 1, 1, 5, CAST(0.00000000 AS Decimal(18, 8)), CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (6, 1, 2, 1, CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(85.00000000 AS Decimal(18, 8)), CAST(5.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (7, 1, 2, 2, CAST(80.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(70.00000000 AS Decimal(18, 8)), CAST(15.00000000 AS Decimal(18, 8)), CAST(5.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (8, 1, 2, 3, CAST(50.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(60.00000000 AS Decimal(18, 8)), CAST(15.00000000 AS Decimal(18, 8)), CAST(15.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (9, 1, 2, 4, CAST(20.00000000 AS Decimal(18, 8)), CAST(80.00000000 AS Decimal(18, 8)), CAST(40.00000000 AS Decimal(18, 8)), CAST(30.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (10, 1, 2, 5, CAST(0.00000000 AS Decimal(18, 8)), CAST(100.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)), CAST(40.00000000 AS Decimal(18, 8)), CAST(40.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (11, 1, 3, 1, CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(70.00000000 AS Decimal(18, 8)), CAST(5.00000000 AS Decimal(18, 8)), CAST(5.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (12, 1, 3, 2, CAST(80.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(55.00000000 AS Decimal(18, 8)), CAST(15.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (13, 1, 3, 3, CAST(50.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(40.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (14, 1, 3, 4, CAST(20.00000000 AS Decimal(18, 8)), CAST(80.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(30.00000000 AS Decimal(18, 8)), CAST(30.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (15, 1, 3, 5, CAST(0.00000000 AS Decimal(18, 8)), CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(40.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (16, 1, 4, 1, CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(65.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)), CAST(5.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (17, 1, 4, 2, CAST(80.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(15.00000000 AS Decimal(18, 8)), CAST(15.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (18, 1, 4, 3, CAST(50.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(30.00000000 AS Decimal(18, 8)), CAST(25.00000000 AS Decimal(18, 8)), CAST(25.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (19, 1, 4, 4, CAST(20.00000000 AS Decimal(18, 8)), CAST(80.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)), CAST(30.00000000 AS Decimal(18, 8)), CAST(40.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (20, 1, 4, 5, CAST(0.00000000 AS Decimal(18, 8)), CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(45.00000000 AS Decimal(18, 8)), CAST(45.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (21, 1, 5, 1, CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(60.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (22, 1, 5, 2, CAST(80.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (23, 1, 5, 3, CAST(50.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(30.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(30.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (24, 1, 5, 4, CAST(20.00000000 AS Decimal(18, 8)), CAST(80.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(40.00000000 AS Decimal(18, 8)), CAST(40.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (25, 1, 5, 5, CAST(0.00000000 AS Decimal(18, 8)), CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(30.00000000 AS Decimal(18, 8)), CAST(60.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (26, 1, 6, 1, CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(60.00000000 AS Decimal(18, 8)), CAST(5.00000000 AS Decimal(18, 8)), CAST(15.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (27, 1, 6, 2, CAST(80.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(5.00000000 AS Decimal(18, 8)), CAST(25.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (28, 1, 6, 3, CAST(50.00000000 AS Decimal(18, 8)), CAST(50.00000000 AS Decimal(18, 8)), CAST(30.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)), CAST(40.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (29, 1, 6, 4, CAST(20.00000000 AS Decimal(18, 8)), CAST(80.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(25.00000000 AS Decimal(18, 8)), CAST(55.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[PercentualRisco] ([Id], [Empresa_Id], [CapacidadeRisco_Id], [PerfilInvestidor_Id], [Baixissimo], [Baixo], [Moderado], [Arrojado], [SuperArrojado], [Hedge]) VALUES (30, 1, 6, 5, CAST(0.00000000 AS Decimal(18, 8)), CAST(100.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), CAST(70.00000000 AS Decimal(18, 8)), CAST(10.00000000 AS Decimal(18, 8)))
SET IDENTITY_INSERT [dbo].[PercentualRisco] OFF
GO
SET IDENTITY_INSERT [dbo].[PerfilAcesso] ON 

INSERT [dbo].[PerfilAcesso] ([Id], [Perfil]) VALUES (1, N'Master')
INSERT [dbo].[PerfilAcesso] ([Id], [Perfil]) VALUES (2, N'BackOffice')
SET IDENTITY_INSERT [dbo].[PerfilAcesso] OFF
GO
SET IDENTITY_INSERT [dbo].[PerfilInvestidor] ON 

INSERT [dbo].[PerfilInvestidor] ([Id], [Descricao], [RiscoMaximo], [MesesReserva]) VALUES (1, N'Super Conservador (até 20% do patrimônio em Risco)', 20, 12)
INSERT [dbo].[PerfilInvestidor] ([Id], [Descricao], [RiscoMaximo], [MesesReserva]) VALUES (2, N'Conservador (de 20% à 30% do patrimônio em Risco)', 30, 9)
INSERT [dbo].[PerfilInvestidor] ([Id], [Descricao], [RiscoMaximo], [MesesReserva]) VALUES (3, N'Moderado (de 30% à 50% do patrimônio em Risco)', 50, 6)
INSERT [dbo].[PerfilInvestidor] ([Id], [Descricao], [RiscoMaximo], [MesesReserva]) VALUES (4, N'Arrojado (de 50% à 80% do patrimônio em Risco)', 80, 4)
INSERT [dbo].[PerfilInvestidor] ([Id], [Descricao], [RiscoMaximo], [MesesReserva]) VALUES (5, N'Super Arrojado (100% do patrimônio em Risco)', 100, 3)
SET IDENTITY_INSERT [dbo].[PerfilInvestidor] OFF
GO
SET IDENTITY_INSERT [dbo].[Planejamento] ON 

INSERT [dbo].[Planejamento] ([Id], [Cliente_Id], [Usuario_Id], [CarteiraSetup_Id], [Data], [Descricao], [TaxaSelic], [TaxaIPCA], [CM], [RE_Sugerido], [RE_Planejado], [RiscoAssumido], [RiscoTolerado], [Sugestao_Baixissimo], [Sugestao_Baixo], [Sugestao_Moderado], [Sugestao_Arrojado], [Sugestao_SuperArrojado], [Sugestao_Hedge], [Sugestao_Total], [Plano_Baixissimo], [Plano_Baixo], [Plano_Moderado], [Plano_Arrojado], [Plano_SuperArrojado], [Plano_Hedge], [Plano_Total], [Atual_Total], [Sugerido_Total], [PlanoAcao_Total], [Atual_RentabilidadeMedia], [Atual_RentabilidadeReal], [PlanoAcao_RentabilidadeMedia], [PlanoAcao_RentabilidadeReal]) VALUES (1, 1, 1, NULL, CAST(N'2022-07-01' AS Date), N'Planejamento do Fulano', CAST(11.75000000 AS Decimal(18, 8)), CAST(6.50000000 AS Decimal(18, 8)), 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Planejamento] OFF
GO
SET IDENTITY_INSERT [dbo].[PlanejamentoInvestimento] ON 

INSERT [dbo].[PlanejamentoInvestimento] ([Id], [Planejamento_Id], [InvestimentoTributacao_Id], [Rentabilidade], [RentabilidadeLiquida], [MontanteAtual], [Sugerido], [PlanoAcao], [ValorLiquido_MontanteAtual], [ValorLiquido_PlanoAcao]) VALUES (1, 1, 48, CAST(6.16778000 AS Decimal(18, 8)), CAST(6.16778000 AS Decimal(18, 8)), CAST(100000.00000000 AS Decimal(18, 8)), NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[PlanejamentoInvestimento] OFF
GO
SET IDENTITY_INSERT [dbo].[PlanejamentoProduto] ON 

INSERT [dbo].[PlanejamentoProduto] ([Id], [Planejamento_Id], [ProdutoTributacao_Id], [Rentabilidade], [RentabilidadeLiquida], [MontanteAtual], [Sugerido], [PlanoAcao], [ValorLiquido_MontanteAtual], [ValorLiquido_PlanoAcao]) VALUES (70, 1, 1, NULL, CAST(0.00000000 AS Decimal(18, 8)), NULL, CAST(16000.00000000 AS Decimal(18, 8)), NULL, NULL, NULL)
INSERT [dbo].[PlanejamentoProduto] ([Id], [Planejamento_Id], [ProdutoTributacao_Id], [Rentabilidade], [RentabilidadeLiquida], [MontanteAtual], [Sugerido], [PlanoAcao], [ValorLiquido_MontanteAtual], [ValorLiquido_PlanoAcao]) VALUES (71, 1, 6, NULL, CAST(0.00000000 AS Decimal(18, 8)), NULL, CAST(16000.00000000 AS Decimal(18, 8)), NULL, NULL, NULL)
INSERT [dbo].[PlanejamentoProduto] ([Id], [Planejamento_Id], [ProdutoTributacao_Id], [Rentabilidade], [RentabilidadeLiquida], [MontanteAtual], [Sugerido], [PlanoAcao], [ValorLiquido_MontanteAtual], [ValorLiquido_PlanoAcao]) VALUES (72, 1, 11, NULL, CAST(0.00000000 AS Decimal(18, 8)), NULL, CAST(5440.00000000 AS Decimal(18, 8)), NULL, NULL, NULL)
INSERT [dbo].[PlanejamentoProduto] ([Id], [Planejamento_Id], [ProdutoTributacao_Id], [Rentabilidade], [RentabilidadeLiquida], [MontanteAtual], [Sugerido], [PlanoAcao], [ValorLiquido_MontanteAtual], [ValorLiquido_PlanoAcao]) VALUES (73, 1, 18, NULL, CAST(0.00000000 AS Decimal(18, 8)), NULL, CAST(5440.00000000 AS Decimal(18, 8)), NULL, NULL, NULL)
INSERT [dbo].[PlanejamentoProduto] ([Id], [Planejamento_Id], [ProdutoTributacao_Id], [Rentabilidade], [RentabilidadeLiquida], [MontanteAtual], [Sugerido], [PlanoAcao], [ValorLiquido_MontanteAtual], [ValorLiquido_PlanoAcao]) VALUES (74, 1, 19, NULL, CAST(0.00000000 AS Decimal(18, 8)), NULL, CAST(2720.00000000 AS Decimal(18, 8)), NULL, NULL, NULL)
INSERT [dbo].[PlanejamentoProduto] ([Id], [Planejamento_Id], [ProdutoTributacao_Id], [Rentabilidade], [RentabilidadeLiquida], [MontanteAtual], [Sugerido], [PlanoAcao], [ValorLiquido_MontanteAtual], [ValorLiquido_PlanoAcao]) VALUES (75, 1, 15, NULL, CAST(0.00000000 AS Decimal(18, 8)), NULL, CAST(20400.00000000 AS Decimal(18, 8)), NULL, NULL, NULL)
INSERT [dbo].[PlanejamentoProduto] ([Id], [Planejamento_Id], [ProdutoTributacao_Id], [Rentabilidade], [RentabilidadeLiquida], [MontanteAtual], [Sugerido], [PlanoAcao], [ValorLiquido_MontanteAtual], [ValorLiquido_PlanoAcao]) VALUES (76, 1, 17, NULL, CAST(0.00000000 AS Decimal(18, 8)), NULL, CAST(20400.00000000 AS Decimal(18, 8)), NULL, NULL, NULL)
INSERT [dbo].[PlanejamentoProduto] ([Id], [Planejamento_Id], [ProdutoTributacao_Id], [Rentabilidade], [RentabilidadeLiquida], [MontanteAtual], [Sugerido], [PlanoAcao], [ValorLiquido_MontanteAtual], [ValorLiquido_PlanoAcao]) VALUES (77, 1, 21, NULL, CAST(0.00000000 AS Decimal(18, 8)), NULL, CAST(13600.00000000 AS Decimal(18, 8)), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[PlanejamentoProduto] OFF
GO
SET IDENTITY_INSERT [dbo].[Produto] ON 

INSERT [dbo].[Produto] ([Id], [Empresa_Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao], [TaxaADM], [TaxaPfee], [CM]) VALUES (1, 1, 1, 1, 1, N'Reserva de Emergência', CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), 0)
INSERT [dbo].[Produto] ([Id], [Empresa_Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao], [TaxaADM], [TaxaPfee], [CM]) VALUES (2, 1, 1, 2, 4, N'C.A. Conservador', CAST(2.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), 1)
INSERT [dbo].[Produto] ([Id], [Empresa_Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao], [TaxaADM], [TaxaPfee], [CM]) VALUES (3, 1, 2, 3, 3, N'C.A. Moderado', CAST(2.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), 1)
INSERT [dbo].[Produto] ([Id], [Empresa_Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao], [TaxaADM], [TaxaPfee], [CM]) VALUES (4, 1, 2, 4, 4, N'C.A. Arrojado', CAST(2.00000000 AS Decimal(18, 8)), CAST(20.00000000 AS Decimal(18, 8)), 1)
INSERT [dbo].[Produto] ([Id], [Empresa_Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao], [TaxaADM], [TaxaPfee], [CM]) VALUES (7, 1, 1, 5, 2, N'Mesa Proprietária (You Capital)', CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), 0)
INSERT [dbo].[Produto] ([Id], [Empresa_Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao], [TaxaADM], [TaxaPfee], [CM]) VALUES (8, 1, 2, 3, 5, N'Private Equity Imobiliário', CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), 0)
INSERT [dbo].[Produto] ([Id], [Empresa_Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao], [TaxaADM], [TaxaPfee], [CM]) VALUES (10, 1, 1, 3, 2, N'Private Equity Gado', CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), 0)
INSERT [dbo].[Produto] ([Id], [Empresa_Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao], [TaxaADM], [TaxaPfee], [CM]) VALUES (11, 1, 1, 3, 2, N'Private Equity Usina Solar', CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), 0)
INSERT [dbo].[Produto] ([Id], [Empresa_Id], [TipoAtivo_Id], [TipoRisco_Id], [TipoLiquidez_Id], [Descricao], [TaxaADM], [TaxaPfee], [CM]) VALUES (14, 1, 3, 6, 2, N'Previdência em Dólar', CAST(0.00000000 AS Decimal(18, 8)), CAST(0.00000000 AS Decimal(18, 8)), 0)
SET IDENTITY_INSERT [dbo].[Produto] OFF
GO
SET IDENTITY_INSERT [dbo].[ProdutoTributacao_Rel] ON 

INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (1, 1, 1)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (2, 1, 2)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (3, 1, 3)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (4, 1, 4)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (5, 2, 1)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (6, 2, 2)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (7, 2, 3)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (8, 2, 4)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (9, 3, 1)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (10, 3, 2)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (11, 3, 3)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (12, 3, 4)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (13, 4, 1)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (14, 4, 2)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (15, 4, 3)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (16, 4, 4)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (17, 7, 36)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (18, 8, 36)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (19, 10, 4)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (20, 11, 36)
INSERT [dbo].[ProdutoTributacao_Rel] ([Id], [Produto_Id], [Tributacao_Id]) VALUES (21, 14, 4)
SET IDENTITY_INSERT [dbo].[ProdutoTributacao_Rel] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoAtivo] ON 

INSERT [dbo].[TipoAtivo] ([Id], [Nome]) VALUES (1, N'Renda Fixa')
INSERT [dbo].[TipoAtivo] ([Id], [Nome]) VALUES (2, N'Renda Variável')
INSERT [dbo].[TipoAtivo] ([Id], [Nome]) VALUES (3, N'Hedge')
SET IDENTITY_INSERT [dbo].[TipoAtivo] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoLiquidez] ON 

INSERT [dbo].[TipoLiquidez] ([Id], [Nome]) VALUES (1, N'Líquido (até D+3)')
INSERT [dbo].[TipoLiquidez] ([Id], [Nome]) VALUES (2, N'Baixa (D+60 a 2 anos)')
INSERT [dbo].[TipoLiquidez] ([Id], [Nome]) VALUES (3, N'Média (D+30 a D+60)')
INSERT [dbo].[TipoLiquidez] ([Id], [Nome]) VALUES (4, N'Alta (até D+30)')
INSERT [dbo].[TipoLiquidez] ([Id], [Nome]) VALUES (5, N'Imobilizado')
SET IDENTITY_INSERT [dbo].[TipoLiquidez] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoRisco] ON 

INSERT [dbo].[TipoRisco] ([Id], [Nome]) VALUES (1, N'Baixíssimo')
INSERT [dbo].[TipoRisco] ([Id], [Nome]) VALUES (2, N'Baixo')
INSERT [dbo].[TipoRisco] ([Id], [Nome]) VALUES (3, N'Moderado')
INSERT [dbo].[TipoRisco] ([Id], [Nome]) VALUES (4, N'Arrojado')
INSERT [dbo].[TipoRisco] ([Id], [Nome]) VALUES (5, N'Super Arrojado')
INSERT [dbo].[TipoRisco] ([Id], [Nome]) VALUES (6, N'Hedge')
SET IDENTITY_INSERT [dbo].[TipoRisco] OFF
GO
SET IDENTITY_INSERT [dbo].[Tributacao] ON 

INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (1, N'Até 180 dias', CAST(22.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (2, N'De 181 a 360 dias', CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (3, N'De 361 a 720 dias', CAST(17.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (4, N'Acima de 720 dias', CAST(15.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (5, N'Day Trade', CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (6, N'Position/Swing Trade', CAST(15.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (7, N'Venda de Cotas', CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (8, N'Dividendos', CAST(0.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (9, N'VGBL até 2 anos', CAST(35.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (10, N'VGBL de 2 a 4 anos', CAST(30.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (11, N'VGBL de 4 a 6 anos', CAST(25.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (12, N'VGBL de 6 a 8 anos', CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (13, N'VGBL de 8 a 10 anos', CAST(15.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (14, N'VGBL 10  anos ou mais', CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (15, N'VGBL Prog. Saque de até R$ 2.141,98', CAST(0.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (16, N'VGBL Prog. Saque de R$ 2.141,99 até R$ 3.179,98', CAST(7.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (17, N'VGBL Prog. Saque de R$ 3.179,99 até R$ 4.219,93', CAST(15.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (18, N'VGBL Prog. Saque de 4.219,94 até R$ 5.247,77', CAST(22.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (19, N'VGBL Prog. Saque acima de R$ 5.247,77', CAST(27.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (20, N'PGBL até 2 anos', CAST(35.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (21, N'PGBL de 2 a 4 anos', CAST(30.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (22, N'PGBL de 4 a 6 anos', CAST(25.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (23, N'PGBL de 6 a 8 anos', CAST(20.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (24, N'PGBL de 8 a 10 anos', CAST(15.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (25, N'PGBL 10  anos ou mais', CAST(10.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (26, N'PGBL Prog. Saque de até R$ 2.141,98', CAST(0.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (27, N'PGBL Prog. Saque de R$ 2.141,99 até R$ 3.179,98', CAST(7.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (28, N'PGBL Prog. Saque de R$ 3.179,99 até R$ 4.219,93', CAST(15.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (29, N'PGBL Prog. Saque de 4.219,94 até R$ 5.247,77', CAST(22.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (30, N'PGBL Prog. Saque acima de R$ 5.247,77', CAST(27.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (31, N'Até R$1.903,98 mensal', CAST(0.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (32, N'De R$1.903,99 até R$2.826,65 mensal', CAST(7.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (33, N'De R$2.826,66 até R$3.751,05 mensal', CAST(15.00000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (34, N'De R$3.751,06 até R$4.664,68 mensal', CAST(22.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (35, N'Acima de R$4.664,68 mensal', CAST(27.50000000 AS Decimal(18, 8)))
INSERT [dbo].[Tributacao] ([Id], [Descricao], [Aliquota]) VALUES (36, N'Isento PF', CAST(0.00000000 AS Decimal(18, 8)))
SET IDENTITY_INSERT [dbo].[Tributacao] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Empresa_Id], [Perfil_Id], [Nome], [Senha], [Email]) VALUES (1, 1, 1, N'Thiago', N'1234', N'abucarub@bullest.com.br')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[CarteiraProduto_Rel]  WITH CHECK ADD  CONSTRAINT [FK_CarteiraProduto_Rel_CarteiraSetup] FOREIGN KEY([CarteiraSetup_Id])
REFERENCES [dbo].[CarteiraSetup] ([Id])
GO
ALTER TABLE [dbo].[CarteiraProduto_Rel] CHECK CONSTRAINT [FK_CarteiraProduto_Rel_CarteiraSetup]
GO
ALTER TABLE [dbo].[CarteiraProduto_Rel]  WITH CHECK ADD  CONSTRAINT [FK_CarteiraProduto_Rel_ProdutoTributacao_Rel] FOREIGN KEY([ProdutoTributacao_Id])
REFERENCES [dbo].[ProdutoTributacao_Rel] ([Id])
GO
ALTER TABLE [dbo].[CarteiraProduto_Rel] CHECK CONSTRAINT [FK_CarteiraProduto_Rel_ProdutoTributacao_Rel]
GO
ALTER TABLE [dbo].[CarteiraSetup]  WITH CHECK ADD  CONSTRAINT [FK_CarteiraSetup_Empresa] FOREIGN KEY([Empresa_Id])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[CarteiraSetup] CHECK CONSTRAINT [FK_CarteiraSetup_Empresa]
GO
ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Cliente_Empresa] FOREIGN KEY([Empresa_Id])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Cliente] CHECK CONSTRAINT [FK_Cliente_Empresa]
GO
ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Cliente_EstadoCivil] FOREIGN KEY([EstadoCivil_Id])
REFERENCES [dbo].[EstadoCivil] ([Id])
GO
ALTER TABLE [dbo].[Cliente] CHECK CONSTRAINT [FK_Cliente_EstadoCivil]
GO
ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Cliente_PerfilInvestidor] FOREIGN KEY([PerfilInvestidor_Id])
REFERENCES [dbo].[PerfilInvestidor] ([Id])
GO
ALTER TABLE [dbo].[Cliente] CHECK CONSTRAINT [FK_Cliente_PerfilInvestidor]
GO
ALTER TABLE [dbo].[Investimento]  WITH CHECK ADD  CONSTRAINT [FK_Investimento_TipoAtivo] FOREIGN KEY([TipoAtivo_Id])
REFERENCES [dbo].[TipoAtivo] ([Id])
GO
ALTER TABLE [dbo].[Investimento] CHECK CONSTRAINT [FK_Investimento_TipoAtivo]
GO
ALTER TABLE [dbo].[Investimento]  WITH CHECK ADD  CONSTRAINT [FK_Investimento_TipoLiquidez] FOREIGN KEY([TipoLiquidez_Id])
REFERENCES [dbo].[TipoLiquidez] ([Id])
GO
ALTER TABLE [dbo].[Investimento] CHECK CONSTRAINT [FK_Investimento_TipoLiquidez]
GO
ALTER TABLE [dbo].[Investimento]  WITH CHECK ADD  CONSTRAINT [FK_Investimento_TipoRisco] FOREIGN KEY([TipoRisco_Id])
REFERENCES [dbo].[TipoRisco] ([Id])
GO
ALTER TABLE [dbo].[Investimento] CHECK CONSTRAINT [FK_Investimento_TipoRisco]
GO
ALTER TABLE [dbo].[InvestimentoTributacao_Rel]  WITH CHECK ADD  CONSTRAINT [FK_InvestimentoTributacao_Id_Investimento] FOREIGN KEY([Investimento_Id])
REFERENCES [dbo].[Investimento] ([Id])
GO
ALTER TABLE [dbo].[InvestimentoTributacao_Rel] CHECK CONSTRAINT [FK_InvestimentoTributacao_Id_Investimento]
GO
ALTER TABLE [dbo].[InvestimentoTributacao_Rel]  WITH CHECK ADD  CONSTRAINT [FK_InvestimentoTributacao_Id_Tributacao] FOREIGN KEY([Tributacao_Id])
REFERENCES [dbo].[Tributacao] ([Id])
GO
ALTER TABLE [dbo].[InvestimentoTributacao_Rel] CHECK CONSTRAINT [FK_InvestimentoTributacao_Id_Tributacao]
GO
ALTER TABLE [dbo].[PercentualRisco]  WITH CHECK ADD  CONSTRAINT [FK_PercentualRisco_Empresa] FOREIGN KEY([Empresa_Id])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[PercentualRisco] CHECK CONSTRAINT [FK_PercentualRisco_Empresa]
GO
ALTER TABLE [dbo].[PercentualRisco]  WITH CHECK ADD  CONSTRAINT [FK_PercentualRisco_PerfilInvestidor] FOREIGN KEY([PerfilInvestidor_Id])
REFERENCES [dbo].[PerfilInvestidor] ([Id])
GO
ALTER TABLE [dbo].[PercentualRisco] CHECK CONSTRAINT [FK_PercentualRisco_PerfilInvestidor]
GO
ALTER TABLE [dbo].[Planejamento]  WITH CHECK ADD  CONSTRAINT [FK_Planejamento_CarteiraSetup] FOREIGN KEY([CarteiraSetup_Id])
REFERENCES [dbo].[CarteiraSetup] ([Id])
GO
ALTER TABLE [dbo].[Planejamento] CHECK CONSTRAINT [FK_Planejamento_CarteiraSetup]
GO
ALTER TABLE [dbo].[Planejamento]  WITH CHECK ADD  CONSTRAINT [FK_Planner_Cliente] FOREIGN KEY([Cliente_Id])
REFERENCES [dbo].[Cliente] ([Id])
GO
ALTER TABLE [dbo].[Planejamento] CHECK CONSTRAINT [FK_Planner_Cliente]
GO
ALTER TABLE [dbo].[Planejamento]  WITH CHECK ADD  CONSTRAINT [FK_Planner_Usuario] FOREIGN KEY([Usuario_Id])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Planejamento] CHECK CONSTRAINT [FK_Planner_Usuario]
GO
ALTER TABLE [dbo].[PlanejamentoFluxosPontuais]  WITH CHECK ADD  CONSTRAINT [FK_PlanejamentoFluxosPontuais_Planejamento] FOREIGN KEY([Planejamento_Id])
REFERENCES [dbo].[Planejamento] ([Id])
GO
ALTER TABLE [dbo].[PlanejamentoFluxosPontuais] CHECK CONSTRAINT [FK_PlanejamentoFluxosPontuais_Planejamento]
GO
ALTER TABLE [dbo].[PlanejamentoGrafico]  WITH CHECK ADD  CONSTRAINT [FK_PlanejamentoGrafico_Planejamento] FOREIGN KEY([Planejamento_Id])
REFERENCES [dbo].[Planejamento] ([Id])
GO
ALTER TABLE [dbo].[PlanejamentoGrafico] CHECK CONSTRAINT [FK_PlanejamentoGrafico_Planejamento]
GO
ALTER TABLE [dbo].[PlanejamentoInvestimento]  WITH CHECK ADD  CONSTRAINT [FK_PlanejamentoInvestimento_InvestimentoTributacao_Rel] FOREIGN KEY([InvestimentoTributacao_Id])
REFERENCES [dbo].[InvestimentoTributacao_Rel] ([Id])
GO
ALTER TABLE [dbo].[PlanejamentoInvestimento] CHECK CONSTRAINT [FK_PlanejamentoInvestimento_InvestimentoTributacao_Rel]
GO
ALTER TABLE [dbo].[PlanejamentoInvestimento]  WITH CHECK ADD  CONSTRAINT [FK_PlanejamentoInvestimento_Planejamento] FOREIGN KEY([Planejamento_Id])
REFERENCES [dbo].[Planejamento] ([Id])
GO
ALTER TABLE [dbo].[PlanejamentoInvestimento] CHECK CONSTRAINT [FK_PlanejamentoInvestimento_Planejamento]
GO
ALTER TABLE [dbo].[PlanejamentoProduto]  WITH CHECK ADD  CONSTRAINT [FK_PlanejamentoProduto_Planejamento] FOREIGN KEY([Planejamento_Id])
REFERENCES [dbo].[Planejamento] ([Id])
GO
ALTER TABLE [dbo].[PlanejamentoProduto] CHECK CONSTRAINT [FK_PlanejamentoProduto_Planejamento]
GO
ALTER TABLE [dbo].[PlanejamentoProduto]  WITH CHECK ADD  CONSTRAINT [FK_PlanejamentoProduto_ProdutoTributacao_Rel] FOREIGN KEY([ProdutoTributacao_Id])
REFERENCES [dbo].[ProdutoTributacao_Rel] ([Id])
GO
ALTER TABLE [dbo].[PlanejamentoProduto] CHECK CONSTRAINT [FK_PlanejamentoProduto_ProdutoTributacao_Rel]
GO
ALTER TABLE [dbo].[Produto]  WITH CHECK ADD  CONSTRAINT [FK_Produto_Empresa] FOREIGN KEY([Empresa_Id])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Produto] CHECK CONSTRAINT [FK_Produto_Empresa]
GO
ALTER TABLE [dbo].[Produto]  WITH CHECK ADD  CONSTRAINT [FK_Produto_TipoAtivo] FOREIGN KEY([TipoAtivo_Id])
REFERENCES [dbo].[TipoAtivo] ([Id])
GO
ALTER TABLE [dbo].[Produto] CHECK CONSTRAINT [FK_Produto_TipoAtivo]
GO
ALTER TABLE [dbo].[Produto]  WITH CHECK ADD  CONSTRAINT [FK_Produto_TipoLiquidez] FOREIGN KEY([TipoLiquidez_Id])
REFERENCES [dbo].[TipoLiquidez] ([Id])
GO
ALTER TABLE [dbo].[Produto] CHECK CONSTRAINT [FK_Produto_TipoLiquidez]
GO
ALTER TABLE [dbo].[Produto]  WITH CHECK ADD  CONSTRAINT [FK_Produto_TipoRisco] FOREIGN KEY([TipoRisco_Id])
REFERENCES [dbo].[TipoRisco] ([Id])
GO
ALTER TABLE [dbo].[Produto] CHECK CONSTRAINT [FK_Produto_TipoRisco]
GO
ALTER TABLE [dbo].[ProdutoTributacao_Rel]  WITH CHECK ADD  CONSTRAINT [FK_ProdutoTributacao_Rel_Produtos] FOREIGN KEY([Produto_Id])
REFERENCES [dbo].[Produto] ([Id])
GO
ALTER TABLE [dbo].[ProdutoTributacao_Rel] CHECK CONSTRAINT [FK_ProdutoTributacao_Rel_Produtos]
GO
ALTER TABLE [dbo].[ProdutoTributacao_Rel]  WITH CHECK ADD  CONSTRAINT [FK_ProdutoTributacao_Rel_Tributacao] FOREIGN KEY([Tributacao_Id])
REFERENCES [dbo].[Tributacao] ([Id])
GO
ALTER TABLE [dbo].[ProdutoTributacao_Rel] CHECK CONSTRAINT [FK_ProdutoTributacao_Rel_Tributacao]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Empresa] FOREIGN KEY([Empresa_Id])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Empresa]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_PerfilAcesso] FOREIGN KEY([Perfil_Id])
REFERENCES [dbo].[PerfilAcesso] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_PerfilAcesso]
GO
USE [master]
GO
ALTER DATABASE [Planner] SET  READ_WRITE 
GO
