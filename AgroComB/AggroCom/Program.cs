// ---------------------------------------------------------------------------------- 
// Copyright (c) The Standard Organization, a coalition of the Good-Hearted Engineers 
// ----------------------------------------------------------------------------------
using Microsoft.AspNetCore.HttpOverrides;
using AggroCom.Brokers.Storages;
using AggroCom.Services.Foundations.ProductOnes;
using AggroCom.Services.Foundations.TableOnes;
using AggroCom.Services.Orchestrations.ProductOneTableOneOrchestrationServices;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using AggroCom.Services.Processings.ProductOnes;
using AggroCom.Services.Foundations.ProductTwos;
using AggroCom.Services.Foundations.TableTwos;
using AggroCom.Services.Orchestrations.ProductTwoTableTwoOrchestrations;
using AggroCom.Services.Processings.ProductTwos;
using AggroCom.Services.Foundations.News;
using AggroCom.Services.Foundations.Photos;
using AggroCom.Services.Foundations.Contacts;
using Microsoft.AspNetCore.Hosting;
using AggroCom.Services.Foundations.Katalogs;
using Microsoft.AspNetCore.Http.Features;
using AggroCom.Services;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.WebHost.ConfigureKestrel(options =>
        {
            options.Limits.MaxRequestBodySize = 200 * 1024 * 1024;
        });

        builder.Services.Configure<FormOptions>(options =>
        {
            options.MultipartBodyLengthLimit = 200 * 1024 * 1024;
        });

        builder.Services.AddControllers();

        BrokersMethods(builder);
        FoundationsServicesMethod(builder);
        OrchestrationMethods(builder);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader();
            });
        });

        var app = builder.Build();

        app.UseStaticFiles();

        if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });

        app.UseHttpsRedirection();


        app.UseCors("AllowAll");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }

    private static void OrchestrationMethods(WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<IProductOneTableOneOrchestrationService,
            ProductOneTableOneOrchestrationService>();

        builder.Services.AddTransient<IProductTwoTableTwoOrchestrationService,
            ProductTwoTableTwoOrchestrationService>();

        builder.Services.AddTransient<IProductOneProcessingService,
            ProductOneProcessingService>();

        builder.Services.AddTransient<IProductTwoProcessingService,
            ProductTwoProcessingService>();
    }

    private static void FoundationsServicesMethod(WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<IProductOneService, ProductOneService>();
        builder.Services.AddTransient<IProductTwoService, ProductTwoService>();
        builder.Services.AddTransient<ITableOneService, TableOneService>();
        builder.Services.AddTransient<ITableTwoService, TableTwoService>();
        builder.Services.AddTransient<INewsService, NewsService>();
        builder.Services.AddTransient<IPhotoService, PhotoService>();
        builder.Services.AddTransient<IContactService, ContactService>();
        builder.Services.AddTransient<IKatalogService, KatalogService>();
    }

    private static void BrokersMethods(WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<IStorageBroker, StorageBroker>();
        builder.Services.AddTransient<IProductService, ProductService>();
    }
}

