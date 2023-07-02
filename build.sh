#!/bin/bash
if [ -d "allure-results" ]
then
  echo "removing allure results, allure-report . . ."
rm -r allure-report
rm -r allure-results
npx playwright test
else
echo ""
fi

if [ -d "allure-results/history" ]
then
    echo "allure-results/history exists."
allure generate --clean && allure open
else
    echo "Error: Directory allure-results/history does not exists."
    allure generate --clean
 ls
 echo "Creating Report with Trends..."
mv allure-report/history  allure-results/
allure generate --clean && allure open
fi