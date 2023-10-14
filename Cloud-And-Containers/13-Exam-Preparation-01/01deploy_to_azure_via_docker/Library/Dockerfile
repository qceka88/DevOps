FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Library/Library.csproj", "Library/"]
COPY ["Library.Data/Library.Data.csproj", "Library.Data/"]
RUN dotnet restore "Library/Library.csproj"
COPY . .
WORKDIR "/src/Library"
RUN dotnet build "Library.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Library.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Library.dll"]
