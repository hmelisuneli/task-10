// Типичный контент для serviceWorkerRegistration.js

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] - IPv6 localhost
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 - IPv4 localhost
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  export function register(config) {
    if ('serviceWorker' in navigator) {
      // URL сервисного работника (обычно это service-worker.js)
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      if (isLocalhost) {
        // Это помогает проверить, что сервисный работник существует или нет
        checkValidServiceWorker(swUrl, config);
  
        // Дополнительно можно записывать сообщения в консоль
        console.log('Running on localhost, service worker registration in development mode.');
      } else {
        // Регистрация сервисного работника
        registerValidSW(swUrl, config);
      }
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // На этом этапе обновлённый контент будет управлять всеми страницами,
                // но старый контент будет работать, пока текущие вкладки не закроются.
                console.log('New content is available and will be used when all ' +
                            'tabs for this page are closed.');
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // На этом этапе всё содержимое будет кэшировано для офлайн использования.
                console.log('Content is cached for offline use.');
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('Error during service worker registration:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Проверка, что сервисный работник может быть найден. Если нет, перезагрузка страницы.
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' }
    })
      .then(response => {
        // Убедиться, что сервисный работник существует и что мы действительно получаем JS файл.
        const contentType = response.headers.get('content-type');
        if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
          // Нет сервисного работника на этом сервере. Возможно, это переконфигурирование сервера.
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Сервисный работник найден. Продолжаем обычную регистрацию.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log('No internet connection found. App is running in offline mode.');
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  }
  