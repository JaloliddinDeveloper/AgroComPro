// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Models.Foundations.Contacts;
using System.Threading.Tasks;

namespace AggroCom.Services.Foundations.Contacts
{
    public interface IContactService
    {
        ValueTask<Contact> RemoveContactAsync(int contactId);
    }
}
