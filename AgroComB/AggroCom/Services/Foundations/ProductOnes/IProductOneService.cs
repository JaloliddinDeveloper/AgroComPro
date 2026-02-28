// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.ProductOnes;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.ProductOnes
{
    public interface IProductOneService
    {
        ValueTask<ProductOne> AddProductOneAsync(ProductOne productOne);
        ValueTask<IQueryable<ProductOne>> RetrieveAllProductOnesAsync();
        ValueTask<ProductOne> RetrieveProductOneByIdAsync(int productOneId);
        ValueTask<ProductOne> ModifyProductOneAsync(ProductOne productOne);
        ValueTask<ProductOne> RemoveProductOneAsync(int productOneId);
    }
}
