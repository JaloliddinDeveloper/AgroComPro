FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["AggroCom/AggroCom.csproj", "AggroCom/"]
RUN dotnet restore "AggroCom/AggroCom.csproj"

COPY . .
WORKDIR "/src/AggroCom"
RUN dotnet publish "AggroCom.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

RUN mkdir -p wwwroot/images wwwroot/files

COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_HTTP_PORTS=8080

ENTRYPOINT ["dotnet", "AggroCom.dll"]
