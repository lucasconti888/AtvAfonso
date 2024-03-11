using Dapper;
using Npgsql;
using Parari.Dashboard.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parati.Dashboard.Repository
{
    public class GPTWsRepository : IGPTWRepository
    {
        private readonly string _dbConfig;

        public GPTWsRepository(string dbConfig)
        {
            _dbConfig = dbConfig;
        }

        public async Task<IEnumerable<CidModel>> GetGPTWsFrequenciaProblemasSaudeMentalMes()
        {
            try
            {
                using (var conn = new NpgsqlConnection(_dbConfig))
                {
                    await conn.OpenAsync();
                    var query = @"
                    WITH meses AS (
    SELECT DISTINCT mes
    FROM cid_f_2023
    WHERE unidade = 'ANC'
),
causa_ranking_total AS (
    SELECT 
        LOWER(descricao) as descricao_lower,
        COUNT(*) as quantidade_total_atestados
    FROM cid_f_2023
    WHERE unidade = 'ANC'
    GROUP BY LOWER(descricao)
    ORDER BY COUNT(*) DESC
    LIMIT 3
),
media_atestados_por_mes AS (
    SELECT 
        m.mes,
        crt.descricao_lower,
        COALESCE(SUM(cf.quantidade_atestados), 0) / COUNT(DISTINCT m.mes) as media_atestados
    FROM meses m
    CROSS JOIN causa_ranking_total crt
    LEFT JOIN (
        SELECT 
            mes, 
            LOWER(descricao) as descricao_lower, 
            COUNT(*) as quantidade_atestados
        FROM cid_f_2023
        WHERE unidade = 'ANC'
        GROUP BY mes, LOWER(descricao)
    ) cf ON m.mes = cf.mes AND crt.descricao_lower = cf.descricao_lower
    GROUP BY m.mes, crt.descricao_lower
)
SELECT 
    mapm.mes, 
    mapm.descricao_lower as descricao, 
    mapm.media_atestados
FROM media_atestados_por_mes mapm
ORDER BY mapm.mes, mapm.media_atestados DESC;

                    ";

                    return await conn.QueryAsync<CidModel>(query);
                }
            }
            catch (Exception ex)
            {
                // TODO: Log.Error(ex, "Erro ao obter informações do GPTW.");
                throw new Exception("An error occurred while trying to fetch GPTW data.", ex);
            }
        }
    }
}