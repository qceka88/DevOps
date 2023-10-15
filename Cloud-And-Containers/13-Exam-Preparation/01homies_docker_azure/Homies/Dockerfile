FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Homies/Homies.csproj", "Homies/"]
COPY ["Homies.Data/Homies.Data.csproj", "Homies.Data/"]
RUN dotnet restore "Homies/Homies.csproj"
COPY . .
WORKDIR "/src/Homies"
RUN dotnet build "Homies.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Homies.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Homies.dll"]
