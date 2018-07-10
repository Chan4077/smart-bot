---
layout: command
command: removeLabel
description: Removes a label to the current GitHub issue
syntax: /removeLabel [label1,label2]
syntaxNotes:
  - Each comma denotes a new label to remove
note: If the label specified does not exist in the repository, the bot will state in the same issue that the label could not be deleted as the label does not exist.
status: stable
---