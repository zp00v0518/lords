if [ -z "$1" ]; then
  echo 'Укажите первым параметром API_URL (например http://king.local или https://king6-backend.ntgdev.com)' && exit 1
fi
echo 'API_URL:' $1;
export NODE_ENV=production;
export PROJECT_NAME=slotoking;
export API_URL=$1;
export DEV_SERVER_PORT=8080;
export NODE_PORT=3040;
export API_TIMEOUT=10000;
export STAGE_USERNAME=$2;
export STAGE_PASSWORD=$3;
export VUE_APP_PAGE_LIMIT_ALL_SLOTS=18;
export VUE_APP_GA_TRACK_FORM=Register,SecuritySettings,Deposit;
export VUE_APP_ROTATORS=https://kg.blogostock.com/mirrors/,https://kg.mailmirrors.com/mirrors/;
export VUE_APP_IS_USE_CLOUD_IMG=false;
export VUE_APP_MAIN_DOMAIN=https://slotokingua.com;
export RAYGUN_ID=NSYMlqBha1nlyHyVXqIJRw;

npm run build;
npm run serve;
