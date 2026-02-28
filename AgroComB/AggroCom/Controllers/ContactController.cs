// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using AggroCom.Brokers.Storages;
using AggroCom.Models.Foundations.Contacts;
using AggroCom.Services.Foundations.Contacts;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;
using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AggroCom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : RESTFulController
    {
        private readonly IStorageBroker storageBroker;
        private readonly IContactService contactService;

        public ContactController(
            IStorageBroker storageBroker,
            IContactService contactService)
        {
            this.storageBroker = storageBroker;
            this.contactService = contactService;
        }

        [HttpPost]
        public async ValueTask<ActionResult<Contact>> PostContactAsync(Contact contact)
        {
            try
            {
                Contact addedContact = await this.storageBroker.InsertContactAsync(contact);


                string botToken = "7640207603:AAEm9BeexRe1GxeUFPQwe9qvBj68_wKG8hU";
                string chatId = "6449761136";
                string message = $"📩 Yangi Contact:\n\n" +
                                 $"👤 Ism: {contact.Name}\n" +
                                 $"📞 Telefon: {contact.Phone}\n" +
                                 $"📧 Email: {contact.Email}\n" +
                                 $"💬 Xabar: {contact.Message}";

                await SendMessageToTelegram(botToken, chatId, message);

                return Created(addedContact);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private async Task SendMessageToTelegram(string botToken, string chatId, string message)
        {
            using (HttpClient client = new HttpClient())
            {
                string url = $"https://api.telegram.org/bot{botToken}/sendMessage";
                var payload = new
                {
                    chat_id = chatId,
                    text = message,
                    parse_mode = "Markdown"
                };

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                await client.PostAsync(url, content);
            }
        }

        [HttpGet]
        public async ValueTask<ActionResult<IQueryable<Contact>>> GetAllContactsAsync()
        {
            try
            {
                IQueryable<Contact> contacts = await this.storageBroker.SelectAllContactsAsync();

                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{Id}")]
        public async ValueTask<ActionResult<Contact>> DeleteContactByIdAsync(int Id)
        {
            try
            {
                return await this.contactService.RemoveContactAsync(Id);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
