// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.ProductTwos;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.TableTwos
{
    public class TableTwoService : ITableTwoService
    {
        private readonly IStorageBroker storageBroker;

        public TableTwoService(IStorageBroker storageBroker)=>
            this.storageBroker = storageBroker;

        public async ValueTask<TableTwo> AddTableTwoAsync(TableTwo tableTwo) =>
            await this.storageBroker.InsertTableTwoAsync(tableTwo);

        public async ValueTask<IQueryable<TableTwo>> RetrieveAllTableTwosAsync() =>
           await this.storageBroker.SelectAllTableTwosAsync();

        public async ValueTask<TableTwo> RetrieveTableTwoByIdAsync(int tableTwoId) =>
            await this.storageBroker.SelectTableTwoByIdAsync(tableTwoId);

        public async ValueTask<TableTwo> ModifyTableTwoAsync(TableTwo tableTwo) =>
            await this.storageBroker.UpdateTableTwoAsync(tableTwo);

        public async ValueTask<TableTwo> RemoveTableTwoAsync(int tableTwoId)
        {
            TableTwo maybeTableTwo = await this.storageBroker.
                SelectTableTwoByIdAsync(tableTwoId);

            return await this.storageBroker.DeleteTableTwoAsync(maybeTableTwo);
        }
    }
}
