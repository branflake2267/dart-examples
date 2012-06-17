#!/bin/sh

# read the project properties - saved varaibles about your workspace
. DartProject.properties

# Does a working direcotry already exist?
if [ ! -d $WORKING_DIRECTORY ]; then
    mkdir $WORKING_DIRECTORY
fi

# change to the working directory to perform the operations
cd $WORKING_DIRECTORY

# Create a working directory
if [ ! -d $WORKING_DIRECTORY ]; then
   mkdir dart-repo 
fi

# Check to see if the depot_tools are in the path
if ! [[ $PATH =~ .*depot_tools.* ]]
then
   export PATH="$PATH":`pwd`/depot_tools
fi

# Check to see if gclient exists and if not fetch the tools
if ! command -v gclient &>/dev/null
then
        git clone https://git.chromium.org/chromium/tools/depot_tools.git
        #put the tools in the enviroment path. Stick this in .bashrc for a long term solution
        export PATH="$PATH":`pwd`/depot_tools
fi

# fetch the dart source via git
cd dart-repo
gclient config https://dart.googlecode.com/svn/branches/bleeding_edge/deps/all.deps
git svn clone -rHEAD https://dart.googlecode.com/svn/branches/bleeding_edge/dart dart
gclient sync
gclient runhooks