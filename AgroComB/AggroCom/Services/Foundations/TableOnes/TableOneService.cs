// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.ProductOnes;
using System.Linq;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.TableOnes
{
    public class TableOneService : ITableOneService
    {
        private readonly IStorageBroker storageBroker;

        public TableOneService(IStorageBroker storageBroker) =>
            this.storageBroker = storageBroker;

        public async ValueTask<TableOne> AddTableOneAsync(TableOne tableOne) =>
            await this.storageBroker.InsertTableOneAsync(tableOne);

        public async ValueTask<IQueryable<TableOne>> RetrieveAllTableOnesAsync() =>
           await this.storageBroker.SelectAllTableOnesAsync();

        public async ValueTask<TableOne> RetrieveTableOneByIdAsync(int tableOneId) =>
            await this.storageBroker.SelectTableOneByIdAsync(tableOneId);

        public async ValueTask<TableOne> ModifyTableOneAsync(TableOne tableOne) =>
            await this.storageBroker.UpdateTableOneAsync(tableOne);

        public async ValueTask<TableOne> RemoveTableOneAsync(int TableOneId)
        {
            TableOne maybeTableOne = await this.storageBroker.SelectTableOneByIdAsync(TableOneId);
            return await this.storageBroker.DeleteTableOneAsync(maybeTableOne);
        }
    }
}
