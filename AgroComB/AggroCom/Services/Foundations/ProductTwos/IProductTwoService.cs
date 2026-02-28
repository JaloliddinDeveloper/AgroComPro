// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.ProductTwos;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.ProductTwos
{
    public interface IProductTwoService
    {
        ValueTask<ProductTwo> AddProductTwoAsync(ProductTwo productTwo);
        ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosAsync();
        ValueTask<ProductTwo> RetrieveProductTwoByIdAsync(int productTwoId);
        ValueTask<ProductTwo> ModifyProductTwoAsync(ProductTwo productTwo);
        ValueTask<ProductTwo> RemoveProductTwoAsync(int productTwoId);
    }
}
