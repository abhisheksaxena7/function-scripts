########## More Details and Metadata - https://github.com/abhisheksaxena7/Copado-SFDX-Analyzer #############
########## Install SFDX Git Delta  ##############
echo y | sfdx plugins:install sfdx-git-delta
sfdx plugins

########## Get Source and Destination Branch names and Checkout Repository #############
copado -p "Reading parameters..."
originBranch=$(jq -r '.originBranch' <<< $branchesAndFileIdJson)
BRANCH="$originBranch"
destinationBranch=$(jq -r '.destinationBranch' <<< $branchesAndFileIdJson)

echo "param branchesAndFileIdJson =  $branchesAndFileIdJson"
echo "param originBranch = $originBranch"
echo "param BRANCH = $BRANCH"

copado -p "cloning repo..."
copado-git-get $destinationBranch
copado-git-get $BRANCH

########### Create delta packages for new, modified or deleted metadata  ############
copado -p "Generating Diff between the Source and Destination branches..."
mkdir changed-sources
sfdx sgd:source:delta --to "HEAD" --from "origin/$destinationBranch" --output changed-sources/ --generate-delta --source .
echo "Here's the files that have been changes in this US"
cat changed-sources/package/package.xml

################ Run SFDX Scanner only on Changed Metadata  ###############
copado -p "running sfdx scanner..."
exitCode=0

# sfdx scanner:run --format json --target "." --engine "cpd" -o /tmp/result.json || exitCode=$?
################ Running in table format to read results in logs  ###############
sfdx scanner:run --format table --target './changed-sources/**/*.*' --engine $engine

################ Finally attaching in sarif format  ###############
sfdx scanner:run --format html --target "./changed-sources/**/*.*" --engine $engine --severity-threshold $severityThreshold --outfile ./result.html || exitCode=$?

################ Uploading Analysis Output  ###############
copado -p 'Attaching Result File'

if [ -f "result.html" ]; then
    copado -u result.html
fi

echo "sfdx scanner scan completed. exit code: $exitCode"
exit $exitCode
