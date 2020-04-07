FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app
# copy csproj and restore as distinct layers
COPY *.csproj .
RUN apt-get update && \
  apt-get install -y wget && \
  apt-get install -y gnupg2 && \
  wget -qO- https://deb.nodesource.com/setup_10.x | bash - && \
  apt-get install -y build-essential nodejs
RUN dotnet restore
# Setup NodeJs


# copy everything else and build app
COPY . .
CMD ["npm", "rebuild", "node-sass"]
RUN dotnet publish -c Release -o out
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
CMD ASPNETCORE_URLS=http://*:$PORT dotnet SleepTracker.dll