docker build -t sleepcounter-image .

docker tag sleepcounter-image registry.heroku.com/sleepcounter/web


docker push registry.heroku.com/sleepcounter/web

heroku container:release web -a sleepcounter