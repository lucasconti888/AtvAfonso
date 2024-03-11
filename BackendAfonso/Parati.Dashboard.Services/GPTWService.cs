using Parari.Dashboard.Repository;

namespace Parati.Dashboard.Services
{
    public class GPTWService : IGPTWService
        {
            private readonly IGPTWRepository _gptwRepository;

            public GPTWService(IGPTWRepository gptwRepository)
            {
                _gptwRepository = gptwRepository;
            }

            async Task<IEnumerable<CidModel>> IGPTWService.GetGPTW()
            {
                try
                {
                    return await _gptwRepository.GetGPTWsFrequenciaProblemasSaudeMentalMes();
                }
                catch (Exception ex)
                {
                    // TODO: Log.Error(ex, "Erro ao obter informações do GPTW do repositório.");
                    throw new ServiceException("An error occurred while retrieving GPTW data.", ex);
                }
            }
    }
        
        public class ServiceException : Exception
        {
            public ServiceException(string message, Exception innerException)
                : base(message, innerException)
            {
            }
        }
}
