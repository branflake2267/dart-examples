#!/bin/sh
# http://code.google.com/p/dart/wiki/Building
# Prerequisites: http://code.google.com/p/dart/wiki/PreparingYourMachine 

# TODO: http://code.google.com/p/dart/wiki/PreparingYourMachine automate more?
# TODO: check for git & svn

# read the project properties - saved varaibles about your workspace
#. DartProject.properties
WORKING_DIRECTORY=~/workspace-source/dart

# Does a working direcotry already exist?
if [ ! -d $WORKING_DIRECTORY ]; then
    mkdir $WORKING_DIRECTORY
fi


# change to the working directory to perform the operations
cd $WORKING_DIRECTORY


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

# Create a working directory
if [ ! -d $WORKING_DIRECTORY/dart-source ]; then
   mkdir dart-source 
fi
cd dart-source


# fetch the dart source via git
gclient config https://dart.googlecode.com/svn/branches/bleeding_edge/deps/all.deps
git svn clone -rHEAD https://dart.googlecode.com/svn/branches/bleeding_edge/dart dart
gclient sync
gclient runhooks


cd dart


# run with sudo
echo "sudo mkdir -p /usr/local/dart-out/ - whats your admin password?"
sudo mkdir -p /usr/local/dart-out/
ln -s -f /usr/local/dart-out/ out

# compile dart
./tools/build.py --arch=ia32


echo "Finished downloading and compiling dart source"