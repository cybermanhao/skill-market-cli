const chalk = require('chalk');
const { getPersonalAccessToken, savePersonalAccessToken, clearPersonalAccessToken } = require('../auth/token-store');

function showHelp() {
  console.log(`
用法：skill-market-cli token <subcommand>

子命令：
  set <token>    保存 Personal Access Token 到本地配置
  get            查看当前保存的 Personal Access Token
  remove         删除本地保存的 Personal Access Token
`);
}

async function token(subcommand, value) {
  switch (subcommand) {
    case 'set': {
      if (!value) {
        console.error(chalk.red('错误：请提供 token 值'));
        console.log(chalk.gray('示例：skill-market-cli token set pat_xxxxxxxxxx'));
        process.exit(1);
      }
      savePersonalAccessToken(value);
      console.log(chalk.green('✓ Personal Access Token 已保存'));
      break;
    }
    case 'get': {
      const pat = getPersonalAccessToken();
      if (pat) {
        console.log(chalk.cyan('当前 Personal Access Token：'));
        console.log(pat);
      } else {
        console.log(chalk.yellow('尚未保存 Personal Access Token'));
        console.log(chalk.gray('可通过以下命令设置：'));
        console.log(chalk.gray('  skill-market-cli token set <your-token>'));
      }
      break;
    }
    case 'remove':
    case 'rm': {
      clearPersonalAccessToken();
      console.log(chalk.green('✓ Personal Access Token 已删除'));
      break;
    }
    default: {
      showHelp();
      if (subcommand) {
        console.error(chalk.red(`未知子命令：${subcommand}`));
        process.exit(1);
      }
    }
  }
}

module.exports = token;
