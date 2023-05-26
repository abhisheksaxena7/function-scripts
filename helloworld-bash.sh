#Parameters
#   name = {$User.Name}
#Image
#   copado-function-core:v1
logInfo() {
echo "$1"
}

logError() {
echo "$1"
copado --error-message "$1"
}

logProgress() {
echo "$1"
copado --progress "$1"
}

logProgress "Starting the Greetings Function"
echo "Hello World $name"
logProgress "Cleaning Up"
