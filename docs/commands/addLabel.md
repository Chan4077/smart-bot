---
layout: command
command: addLabel
description: Adds a label to the current GitHub issue
syntax: /addLabel [label1,label2]
syntaxNotes:
  - Each comma denotes a new label
note: If the label specified does not exist in the repository, a new one will be automatically created. This is intentional behaviour and won't be changed.
status: stable
---