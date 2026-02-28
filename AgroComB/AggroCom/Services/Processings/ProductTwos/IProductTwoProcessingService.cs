// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.ProductTwos;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Processings.ProductTwos
{
    public interface IProductTwoProcessingService
    {
        ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosBiostimulyatorAsync();
        ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosMikroelementAsync();
        ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosNpkAsync();
        ValueTask<IQueryable<ProductTwo>> RetrieveAllProductTwosOrganikAsync();
    }
}
