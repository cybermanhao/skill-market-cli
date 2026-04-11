const chalk = require('chalk');
const { clearToken, clearPersonalAccessToken, isLoggedIn, getConfig, saveConfig } = require('../auth/token-store');
const apiClient = require('../api/client');

async function logout() {
  if (!isLoggedIn()) {
    console.log(chalk.yellow('当前未登录，无需登出。'));
    console.log('');
    return;
  }

  try {
    await apiClient.client.post('/oauth/logout');
  } catch (e) {
    // 忽略网络错误，仍清除本地凭证
  }

  clearToken();
  clearPersonalAccessToken();

  // 清除由 login 写入的 server / mode，避免后续命令错误指向 localhost
  const config = getConfig();
  if (config.server || config.mode) {
    delete config.server;
    delete config.mode;
    saveConfig(config);
  }

  console.log(chalk.green('已登出本地凭证'));
  console.log('');
}

module.exports = logout;
