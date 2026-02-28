using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.Katalogs;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.Katalogs
{
    public class KatalogService : IKatalogService
    {
        private readonly IStorageBroker storageBroker;

        public KatalogService(IStorageBroker storageBroker)=>
            this.storageBroker = storageBroker;
        

        public async ValueTask<Katalog> RemoveKatalogAsync(int id)
        {
            Katalog katalog=await this.storageBroker.SelectKatalogByIdAsync(id);

            return await this.storageBroker.DeleteKatalogAsync(katalog);
        }
    }
}
