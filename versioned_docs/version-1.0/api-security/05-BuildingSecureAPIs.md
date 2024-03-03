---
title: Building Secure APIs
---



## Design Principles

API designers/developers **MUST** consider the [OWASP Security By Design Principles](https://wiki.owasp.org/index.php/Security_by_Design_Principles) and document how these are implemented by their API.

| OWASP Security By Design Principle | Summary statement              |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Minimise attack surface area       | Every feature that is added to an application adds a certain amount of risk to the overall application. The aim for secure development is to reduce the overall risk by reducing the attack surface area. |
| Establish secure defaults          | However, by default, the experience should be secure, and it should be up to the user to reduce their security – if they are allowed. |
| Principle of Least privilege       | Accounts shall have the minimum privileges required to perform their business processes |
| Principle of Defense in depth      | Where one control would be reasonable, more controls that approach risks in different fashions are better. |
| Fail securely                      | Applications regularly fail to process transactions for many reasons. How they fail can determine if an application is secure or not. |
| Don’t trust services               | Do not implicitly trust services/functions supplied from outside the API application boundary |
| Separation of duties               | Administrators should not be users of the application and vice versa |
| Avoid security by obscurity        | Security through obscurity is a weak security control, and nearly always fails when it is the only control. |
| Keep security simple               | Favour straightforward and simple code over overly complex approaches |
| Fix security issues correctly      | Once a security issue has been identified, it is important to develop a test for it, and to understand the root cause of the issue. |

## General technical security requirements

API designers/developers **MUST** ensure the API implementation adheres to all of the following best practices:

| Requirement | Description                    |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Encryption of data in transit      | All communication between api consumers and api providers **MUST** be over TLS to help address eavesdropping and man-in-the-middle attacks. |
| Validate all incoming data         | *All* content of *all* incoming messages **MUST** be validated by the API implementation and/or its supporting infrastructure |
| Forbidden OAuth 2.0 grant types        | APIs **MUST NOT** allow use of OAuth 2.0 *Implicit* or *Password* Grant Types. |
| Validate REDIRECTs                 | OAuth 2.0-protected API servers **MUST** check the `redirect_uri` of received authorisation requests is identical to the redirection URI registered for the client (consumer), to mitigate redirection to unauthorised URIs. |
| Validate OIDC ID tokens           | Consumers of OIDC-secured APIs **MUST** validate ID tokens they obtain from an authorisation server. |
| Validate OAuth 2.0 Access tokens       | Consumers of OAuth 2.0-secured APIs[^1] **MUST** validate Issuer, Signature, Claims and Scopes in an OAuth 2.0 Access token before use. |
| OAuth 2.0 tokens to be short-lived     | APIs which require OAuth 2.0 tokens **MUST** ensure each token is issued with a short[^2] lifetime / expiry to minimise risks from the use of stolen tokens. When long access periods are required, the API **MUST** require the use of **Refresh Tokens** |
| Request minimal OAuth 2.0 scopes       | In line with the *least privilege* design principle, OAuth 2.0 API consumers **SHOULD** request only scopes needed for a particular solution domain and context of usage |
| Tokens stored encrypted            | If an OAuth 2.0-protected API Consumer needs to store a token, this **MUST** only be done in **encrypted local storage** |
| Proof Key for Code Exchange (PKCE) | OAuth 2.0 API consumers **MUST** use PKCE (pronounced "pixie") to prevent cross site request forgery (XSRF) and `authorization code` injection attacks if the API Client is a Public Client[^3].|

[^1]: In this standard, means an API protected by OAuth 2.0 or 2.1 security
[^2]: In the order of 30 minutes
[^3]: A Public Client is a client incapable of maintaining the confidentiality of its client credentials. Examples include applications running in a user's browser or mobile applications where the client credentials could be easily extracted.

## Reference Resources

:::info
The following resources are recommended reading for those who are new to API implementation.
:::

- [<u>Design Driven Development</u>](../api-development/API%20Design#design-driven-development)

- [<u>OWASP Top Ten</u>](https://owasp.org/www-project-top-ten/) – A
  summary of the standard attacks and mitigations

- [<u>REST Security Cheat
  Sheet</u>](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
  – REST-specific risks and how to prevent them, e.g. input validation

- [<u>OWASP API Security
  Project</u>](https://owasp.org/www-project-api-security/) – Top 10
  API-specific risks and how to prevent them

The [<u>OWASP Cheat Sheet
Series</u>](https://cheatsheetseries.owasp.org/index.html) provides
cheat sheets on a variety of security-related subjects. It is worth
reviewing them to see if others may apply to your specific
circumstances. Special note should be taken of the following where
your API accepts input values as parameters:

- [<u>OWASP Input Validation Cheat
  Sheet</u>](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
  – A summary of input risks and mitigations

- [<u>OWASP Cross Site Scripting Prevention Cheat
  Sheet</u>](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
  – how to escape inputs to prevent cross site scripting

- [<u>OWASP SQL Injection Prevention Cheat
  Sheet</u>](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
  – ensuring database queries are built internally

- [<u>OWASP Query Parameterisation Cheat
  Sheet</u>](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html)
  – examples of SQL injection and stored procedure vulnerabilities
