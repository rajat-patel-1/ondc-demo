const fetch = require("node-fetch");
const { v4 } = require("uuid");
const fs = require("fs");
const { getKeyPairs } = require("./keyPair");

const url = "https://preprod.registry.ondc.org/ondc/subscribe";
const urlTest = "https://pilot-gateway-1.beckn.nsdl.co.in/ondc/subscribe";

const body = {
  context: {
    operation: {
      ops_no: 1,
    },
  },
  message: {
    request_id: "27baa06d-f90a-486c-85e5-cc621b727f05",
    timestamp: "2022-10-04T07:30:53.512Z",
    entity: {
      gst: {
        legal_entity_name: "ABC Incorporates",
        business_address: "Trade World, Mansarpur, Coorg, Karnataka 333333",
        city_code: ["std:080"],
        gst_no: "07AAACN2082N4Z7",
      },
      pan: {
        name_as_per_pan: "ABC Incorporates",
        pan_no: "ASDFP7657Q",
        date_of_incorporation: "23/06/1982",
      },
      name_of_authorised_signatory: "Anand Sharma",
      "address_of_authorised Signatory":
        "405, Pinnacle House, Kandiwali, Mumbai 400001",
      email_id: "anand.sharma@abc.com",
      mobile_no: 9912332199,
      country: "IND",
      subscriber_id: "ondc-demo.herokuapp.com",
      unique_key_id: "27baa06d-f90a-486c-85e5-cc621b787f04",
      callback_url: "/ondc/onboarding",
      key_pair: {
        signing_public_key: "24OcDnMz9oY/vL4ATX+pOeLwidRpOIcWXAFn7CWXy0M=",
        encryption_public_key: "3gLpjvBMWLXGNbvIx4/BYQEI+98/vTjfpdkw4wPqxF4=",
        valid_from: "2022-10-04T07:25:53.512Z",
        valid_until: "2022-11-04T07:25:53.512Z",
      },
    },
    network_participant: [
      {
        subscriber_url: "/bapl",
        domain: "nic2004:52110",
        type: "buyerApp",
        msn: false,
        city_code: ["std:080"],
      },
    ],
  },
};
const request2 = {
  domain: "local-retail",
  use_case: "on_search/sending_a_list_of_items",
  ttl: 1000,
  "message.intent.item.descriptor.name": "chicken",
  bpp_uri: "http://65.2.62.107:8089/beckn/kfc",
};
const subscribe = async () => {
  body.message.request_id = v4();
  body.message.entity.unique_key_id = body.message.request_id;
  body.message.timestamp = new Date().toISOString();

  console.log(JSON.stringify(body));

  const res = await fetch(urlTest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const res2 = await fetch("http://13.235.139.60/sandbox/bap/trigger/search",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request2),
  })
  const data = await res.text();
  const data2 = await res2.text();
  console.log('-----------------------')
  console.log(res.statusText,res2.statusText, data,data2);
};
module.exports = { subscribe };
