using AggroCom.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AggroCom.Services
{
    public interface IProductService
    {
        Task<List<ProductSearchResult>> SearchProductsAsync(string searchText);
    }
}
