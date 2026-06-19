Set objShell = CreateObject("WScript.Shell")

' Delete the lock file
Set fso = CreateObject("Scripting.FileSystemObject")
lockFile = "C:\SAHITH\Divaa-Jewels-Codex\_theme_v3\divaa-shopify-theme\.git\index.lock"
If fso.FileExists(lockFile) Then
    fso.DeleteFile lockFile, True
End If

' Run git commands in a visible window
objShell.Run "cmd.exe /k ""cd /d C:\SAHITH\Divaa-Jewels-Codex\_theme_v3\divaa-shopify-theme && git add -A && git commit -m ""Update theme: filters, header, product card, cart drawer, home sections"" && git push origin divaa-newdesign && echo DONE - press any key to close && pause""", 1, False
