#!/bin/bash

echo "🔧 Fixing proxy configuration issues..."

# Clear environment proxy variables
unset http_proxy
unset https_proxy
unset HTTP_PROXY
unset HTTPS_PROXY
unset ftp_proxy
unset FTP_PROXY
unset no_proxy
unset NO_PROXY

echo "✅ Cleared proxy environment variables"

# Clear npm proxy settings
npm config delete proxy 2>/dev/null
npm config delete https-proxy 2>/dev/null
npm config delete registry 2>/dev/null
npm config set registry https://registry.npmjs.org/

echo "✅ Cleared npm proxy settings"

# Clear git proxy settings
git config --global --unset http.proxy 2>/dev/null
git config --global --unset https.proxy 2>/dev/null

echo "✅ Cleared git proxy settings"

# Check if VS Code settings directory exists and clear proxy settings
VSCODE_SETTINGS_DIRS=(
    "$HOME/.config/Code/User"
    "$HOME/.vscode/User" 
    "$HOME/Library/Application Support/Code/User"
    "$HOME/AppData/Roaming/Code/User"
)

for dir in "${VSCODE_SETTINGS_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        settings_file="$dir/settings.json"
        if [ -f "$settings_file" ]; then
            echo "📝 Found VS Code settings at: $settings_file"
            # Create backup
            cp "$settings_file" "$settings_file.backup.$(date +%Y%m%d_%H%M%S)"
            
            # Remove proxy settings using jq if available, otherwise manual sed
            if command -v jq >/dev/null 2>&1; then
                jq 'del(.["http.proxy"], .["http.proxySupport"], .["http.proxyAuthorization"])' "$settings_file" > "$settings_file.tmp" && mv "$settings_file.tmp" "$settings_file"
            else
                # Manual removal with sed
                sed -i.bak '/[[:space:]]*"http\.proxy"/d; /[[:space:]]*"http\.proxySupport"/d; /[[:space:]]*"http\.proxyAuthorization"/d' "$settings_file"
            fi
            echo "✅ Cleaned VS Code proxy settings"
        fi
    fi
done

# Check for Cursor settings
CURSOR_SETTINGS_DIRS=(
    "$HOME/.config/Cursor/User"
    "$HOME/Library/Application Support/Cursor/User"
    "$HOME/AppData/Roaming/Cursor/User"
)

for dir in "${CURSOR_SETTINGS_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        settings_file="$dir/settings.json"
        if [ -f "$settings_file" ]; then
            echo "📝 Found Cursor settings at: $settings_file"
            # Create backup
            cp "$settings_file" "$settings_file.backup.$(date +%Y%m%d_%H%M%S)"
            
            # Remove proxy settings
            if command -v jq >/dev/null 2>&1; then
                jq 'del(.["http.proxy"], .["http.proxySupport"], .["http.proxyAuthorization"])' "$settings_file" > "$settings_file.tmp" && mv "$settings_file.tmp" "$settings_file"
            else
                sed -i.bak '/[[:space:]]*"http\.proxy"/d; /[[:space:]]*"http\.proxySupport"/d; /[[:space:]]*"http\.proxyAuthorization"/d' "$settings_file"
            fi
            echo "✅ Cleaned Cursor proxy settings"
        fi
    fi
done

echo ""
echo "🎉 Proxy cleanup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Restart VS Code and Cursor"
echo "2. Try checking for updates again"
echo "3. If the issue persists, check your system/network proxy settings"
echo ""
echo "💡 If you need to use a proxy, configure it properly in the application settings"