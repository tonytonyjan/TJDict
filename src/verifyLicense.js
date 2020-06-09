import { verify, cleartext, key } from "openpgp";

const publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBF7Waz0BCAC5ybXrdAssr8yX31NnxFz9NvDeb1WpO4M6QwbjLA/yz9K760rA
0ZT2EceBcoR3NWsiPKPyt8YmcG/yXpmeLRfcwZ/TeCR9l8W1IEEJywYVWiVXOa6K
o0Ngp+1QcsCHhnqZyXHmr3O4LAJo4ZolRaOEMPE6ctfldM58NB3+MIgZK7x0Pz+s
xxw8C7q+sxVn/GddLtikWD2LTZ8mez4T8mNFzjNc4bt+nn2P5VYfCVTn/H/C8pMd
arhhE7PyoWC809p4cvb4nQfX3JmSBkm0q0kp/4ifvf3iETyr+kB1FD6UZuvERfCM
nwBDomnLUN6NOhAYcEV47+ts/9e74YoVePqzABEBAAG0HlRKRGljdCA8dG9ueXRv
bnlqYW5AZ21haWwuY29tPokBTgQTAQoAOBYhBGEoapofXVV6dNdF9OqgsRhBD1MQ
BQJe1ms9AhsDBQsJCAcDBRUKCQgLBRYCAwEAAh4BAheAAAoJEOqgsRhBD1MQ7Z4H
/2W66N/jm/sCSEP3cp0Zu24TXn9PFkS5XkcRPBbgpjPrVSu1++Vs4kt3owqZATxc
C/xQfkxgjpbWVulwxaYbv1S6xG8OlOv1pWGZ2HEOijH5utgzeNFTqlFsMCgj/qng
dyBaJTnZ95b5FlobVcZdG7zGynpKw7Hhf4Y7zS53AQz5lUgL4Z0dKR5zaauCiO9v
l5BG5af0gib+wK7VAkLeKjjnmmtB1ooSR4eSm04ON46vN0iP+r0VUrW8kAcsK//d
SMWqtqd6nUCoz6z0dj78S4H9lU+Genq2PH4qBILkwQVnQNeKmPHjxBwZBlIokNIv
uXcY1yaPz13hG9Nu2RvaExa5AQ0EXtZrPQEIAK5Q0RtQP4yWDNrddh9Hw7tdAgca
if4NcPjJS6HEzweLrUMaFNRj9WnAaa+UluR4JJT9lTn/lT21b+5RYHU+WRHv0zfL
TKsBCVZabvhHG62VVUHh05DUSXzzcdVSvTzfpAs/jiKHUfvOAPSp5Ud8/zhsq5km
5vSQ5rJ4N99U27zktQjnegPrCWZb4QpbZN8E8h8l095xfk5fF0WmGrL9Yrg/iaYw
7792Ufo1m13ReHH/IFNC9O4vOVzw30nT/TxHgSIcGGfAhXk9jh9YjBoulrEO0/6D
Di3hdAH2gzG3lz+r1qzU+JXOeyBko8/jFeInkg9bHRsfjB/9bphfayI795EAEQEA
AYkBNgQYAQoAIBYhBGEoapofXVV6dNdF9OqgsRhBD1MQBQJe1ms9AhsMAAoJEOqg
sRhBD1MQWS8IAJBr1InYG7cjMHviIfq1dKWczYYtSiMcmqey5+T8TcStgkdqjd6P
43OqYAU7SMBRObFOQJ+Xwl90A2mZSy7Pf3MJPWPC0qwBFiP9d4AbisKQUFIoDhIc
i8wYEy3LuCwd1fEC4lZO4ye82BqDb1eyjHefP0dkKQaZsozQbaVG1bErt3G3MO5t
wHWvOddx1fHTsoKw35JZ7Is8ka5fW70g+8u6TLinXt7LJdv6gprEze+hTXtU7LWg
lqP0uzIoXBtFZ88hfeDS2lJHOJFyPgTdPsOzW5DfgUfG1jJ8mONf+2s7CWfh5ZyS
j7v+CfyHqjLGaYQEKJ0J+xUxwVbug01j2Mc=
=b95N
-----END PGP PUBLIC KEY BLOCK-----
`;

export default async (clearText) => {
  const verified = await verify({
    message: await cleartext.readArmored(clearText),
    publicKeys: (await key.readArmored(publicKey)).keys,
  });
  const {
    signatures: [{ valid }],
    data,
  } = verified;
  if (!valid) throw new Error("license signature is not valid");
  return JSON.parse(data);
};
