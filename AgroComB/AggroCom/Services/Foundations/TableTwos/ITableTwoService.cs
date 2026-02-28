// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.ProductTwos;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.TableTwos
{
    public interface ITableTwoService
    {
        ValueTask<TableTwo> AddTableTwoAsync(TableTwo tableTwo);
        ValueTask<IQueryable<TableTwo>> RetrieveAllTableTwosAsync();
        ValueTask<TableTwo> RetrieveTableTwoByIdAsync(int tableTwoId);
        ValueTask<TableTwo> ModifyTableTwoAsync(TableTwo tableTwo);
        ValueTask<TableTwo> RemoveTableTwoAsync(int tableTwoId);
    }
}
