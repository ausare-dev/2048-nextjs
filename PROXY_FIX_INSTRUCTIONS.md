# Исправление ошибки прокси в VS Code и Cursor

## Проблема
Ошибка: `Failed to establish a socket connection to proxies: PROXY 127.0.0.1:10809`

Это происходит когда VS Code/Cursor пытается использовать прокси-сервер, который не запущен.

## Быстрое решение

### Автоматическое исправление
Запустите скрипт:
```bash
./fix_proxy.sh
```

### Ручное исправление

#### 1. В VS Code/Cursor
1. Откройте настройки (`Ctrl+,` или `Cmd+,`)
2. Найдите "proxy" в поиске
3. Установите следующие значения:
   - `http.proxy`: оставьте пустым `""`
   - `http.proxySupport`: установите `"off"`
   - `http.proxyAuthorization`: удалите если есть

#### 2. Через файл настроек
Найдите файл `settings.json`:
- **Windows**: `%APPDATA%\Code\User\settings.json`
- **macOS**: `~/Library/Application Support/Code/User/settings.json`
- **Linux**: `~/.config/Code/User/settings.json`

Удалите или закомментируйте строки:
```json
{
  // "http.proxy": "http://127.0.0.1:10809",
  // "http.proxySupport": "on",
  // "http.proxyAuthorization": null
}
```

#### 3. Очистка переменных окружения
```bash
unset http_proxy
unset https_proxy
unset HTTP_PROXY
unset HTTPS_PROXY
```

#### 4. Очистка npm прокси
```bash
npm config delete proxy
npm config delete https-proxy
```

#### 5. Очистка git прокси
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## После исправления

1. **Перезапустите** VS Code и Cursor
2. **Попробуйте** проверить обновления снова
3. **Если проблема остается**, проверьте системные настройки прокси

## Если нужен прокси

Если вам действительно нужен прокси:

1. Убедитесь что прокси-сервер запущен на `127.0.0.1:10809`
2. Или настройте правильный адрес прокси в настройках
3. Проверьте настройки VPN - они могут конфликтовать

## Проверка соединения

Проверьте доступность сервера обновлений:
```bash
curl -I https://codeviz-be-3d797dfb13f6.herokuapp.com/v2/extension/update
```

Если получаете 404 - это нормально, сервер отвечает.