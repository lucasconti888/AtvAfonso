namespace Parari.Dashboard.Repository
{
    public class CidModel
    {
        public string Mes { get; set; } // Supondo que mes seja uma string que representa o mês
        //public string Cid { get; set; } // Código da Classificação Internacional de Doenças
        public string descricao { get; set; } // Descrição ou tipo do atestado
        public int quantidade_atestados { get; set; } // Contagem dos atestados
    }
}
