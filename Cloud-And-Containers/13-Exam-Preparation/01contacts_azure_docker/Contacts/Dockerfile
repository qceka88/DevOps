FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Contacts/Contacts.csproj", "Contacts/"]
COPY ["Contacts.Data/Contacts.Data.csproj", "Contacts.Data/"]
RUN dotnet restore "Contacts/Contacts.csproj"
COPY . .
WORKDIR "/src/Contacts"
RUN dotnet build "Contacts.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Contacts.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Contacts.dll"]
