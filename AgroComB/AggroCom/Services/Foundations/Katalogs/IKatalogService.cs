using AggroCom.Models.Foundations.Katalogs;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.Katalogs
{
    public interface IKatalogService
    {
        ValueTask<Katalog> RemoveKatalogAsync(int id);
    }
}
