using AggroCom.Models;
using AggroCom.Services;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

public class ProductService : IProductService
{
    private readonly string _connectionString;

    public ProductService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public async Task<List<ProductSearchResult>> SearchProductsAsync(string searchText)
    {
        using IDbConnection connection = new MySqlConnection(_connectionString);

        string sql = @"
            SELECT 'ProductOnes' AS TableName, Id, TitleUz, TitleRu, DescriptionUz, DescriptionRu, ProductPicture
            FROM ProductOnes
            WHERE LOWER(TitleUz) LIKE @search OR LOWER(TitleRu) LIKE @search
                OR LOWER(DescriptionUz) LIKE @search OR LOWER(DescriptionRu) LIKE @search

            UNION ALL

            SELECT 'ProductTwos' AS TableName, Id, TitleUz, TitleRu, DescriptionUz, DescriptionRu, ProductPicture
            FROM ProductTwos
            WHERE LOWER(TitleUz) LIKE @search OR LOWER(TitleRu) LIKE @search
                OR LOWER(DescriptionUz) LIKE @search OR LOWER(DescriptionRu) LIKE @search;";

        var parameters = new { search = $"%{searchText.ToLower()}%" };

        var result = await connection.QueryAsync<ProductSearchResult>(sql, parameters);

        return result.ToList();
    }
}
