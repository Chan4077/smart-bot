---
layout: command
command: removeLabel
description: Removes a label from the current GitHub issue
syntax: /removeLabel [label1,label2]
syntaxNotes:
  - Each comma denotes a new label to remove
  - If no argument is specified, the bot will output a help comment in the issue
note: If the label specified does not exist in the repository, the bot will state in the same issue that the label could not be deleted as the label does not exist.
status: stable
---