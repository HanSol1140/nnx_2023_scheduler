!macro customInstall
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "nnx_scheduler" "$INSTDIR\scheduler.exe"
!macroend

!macro customUnInstall
    DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "nnx_scheduler"
!macroend