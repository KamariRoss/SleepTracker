docker build -t SleepTracker-image .

docker tag SleepTracker-image registry.heroku.com/SleepTracker/web


docker push registry.heroku.com/SleepTracker/web

heroku container:release web -a SleepTracker