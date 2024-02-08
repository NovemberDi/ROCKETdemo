import axios from "axios";
import fs from "fs"
import { client_id,  client_secret, redirect_uri, code } from './amo-client.json'

const token = async () => {
  const response = await axios.post(
    'https://dmitrih.amocrm.ru/oauth2/access_token',
    {
      'client_id': client_id,
      'client_secret': client_secret,
      'code': 'def502000003d1353bae010c24ee5e44e80a168be3d889c0b86b8430d8c27135d7218cd36efcedf83b3f735d16d066d0e40fda9acb14ecabf20e3c3b33571f611f484c4d707c14fb31ae1d8c3e7ddfe2bbc1b99e4f0cd7bf5c844119c0e769826334dbd7e50c08e628103333840a9d77936e993a17e5a47483551312801d5955e8b7cce975b4afb8dca34d59786ca7a735d7bc4a164fc91cde79ece5686843fd111aa76cee3245394944107d200121a519bea71e3c443058bf0c4ad97d512cf0fc0e22700251c870fc3bbec2f31926c6b529ea449261c6807b6eab80ca383da6ad7df062afdb16284a622730cdd477b9a7b8186cea603195ba485e9260f6aa65c600a4e40811820b35f011df0a5e99f28f20f134d74fe01d24a1882938ceea04bb4b52e1754441914990c4ff24cd13cc9584f1417fcf52d9527367ea71ab09bbf256028386f504d27c037e5e17fe277eed033c94e6bcd5779692b721abccdb8d6d5c3fe373cf9238278383dce8c3d2b1de166bd966a4ec457ffb75488fb32078174f8b6fb8a5c33ede36839e9ad6c2c4789bd64b32680be5b584c7313b9125f96fecb98e69c9fde35e4435fee1a6e82457878b35b82ac3f3de431e183bcbaf036bfcfa5b581a8582a6fd053941e3c26198ce843a8028d2b4e35727f059297447f028',
      'grant_type': 'authorization_code',
      'redirect_uri': redirect_uri
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  console.log(response.data);
  let content = {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token
  };
  fs.writeFileSync(__dirname+'/tokens.json', JSON.stringify(content, null, 2));
 
}

token();