#!/bin/bash

SNAME='planet-orbits'

# check if our session already exists
tmux has-session -t $SNAME 2>/dev/null

# $? is the most recent foreground pipeline exit status. [source](https://stackoverflow.com/a/5163260)

if [ $? != 0 ]; then
    # cd ~/game-projects/prototype-planet-orbits
    tmux new-session -d -s $SNAME -n serve
    tmux send-keys -t $SNAME:serve "python3 serve.py" C-m
    tmux new-window -n vim
    tmux send-keys -t $SNAME:vim "vim ." C-m

    tmux select-window -t $SNAME:vim
fi

tmux attach-session -t $SNAME
