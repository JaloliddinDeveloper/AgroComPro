using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.News;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.News
{
    public class NewsService : INewsService
    {
        private readonly IStorageBroker storageBroker;

        public NewsService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        public async ValueTask<New> RemoveNewsAsync(int newId)
        {
            New maybeNew=await this.storageBroker.SelectNewByIdAsync(newId);

            return await this.storageBroker.DeleteNewAsync(maybeNew);
        }
    }
}
