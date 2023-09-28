FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as builder

# Create a working directory
WORKDIR /worker_app

# Copy the .csproj file and restore
COPY worker/src/Worker/Worker.csproj /worker_app
RUN dotnet restore

# Copy source files to the image
COPY worker/src/Worker /worker_app

# Build the project
RUN dotnet publish -c Release -o /out Worker.csproj

# Specify app image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

# Specify working directory for this stage
WORKDIR /app

# Tell Docker what command to run when our image is executed inside a container
ENTRYPOINT ["dotnet", "Worker.dll"]

# Copy the /out directory from the build stage into the runtime image
COPY --from=builder /out .