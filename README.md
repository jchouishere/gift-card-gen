gift-card-gen
===============

Generating gift-card-style random strings based on a set of pre-defined rules (random-character pools and length of random string).

Usage
-----

1) Design a ruleset (refer to section "Rulesets"), 

2) Implement the ruleset methods (getRand(), getSwitch(), getStrength(), and package())

--> getRand()

Declare an array, push all possible vectors of random characters into the array, and return the array.  Note: they will be used in the order they are "pushed" into the array.

--> getSwitch()

Return an array of the POSITIONS in which to switch to the next random vector.

--> getStrength()

Return an integer to specify how many digits there are in your gift card numbers

--> package()

Return a "packaged" gift card number using the regex pattern you specify.

3) Minify/Encode your script using YUI Compressor or Google Closure Compiler

4) Password protect the folder, or DON'T EVEN HOST IT ONLINE (as the source code is out in the open!) - Refer to "Security Concerns"

Rulesets
--------

An Example:

ABC Company's gift cards are generated based on the following ruleset:

1) A total of 20 characters, in this format: XXXXX-XXXXX-XXXXX-XXXXX

2) Digits 1 - 5 will be a random character from 'ABBCDEFGGG' -> p('B') = 0.2, p('G') = 0.3 

3) Digits 6 - 10 from 'ABCDEFGXXYYZZZ13579'

4) Digits 11 - 15 from 'ABDFHJLNPRTVXZ2468'

5) Digits 16 - 20 from 'BDFHJLMOPRSUVXY2222244444666668888899999'

6) Verification code is calculated as follows:

A = \#occurrences of numerals (0-9); if NONE, assign "5"

B = \#occurrences of odd numbers; if NONE, assign "2"

C = \#occurrences of certain alphas (A, B, C, D, X, Y, Z); if NONE, assign "7"

seed = | ceil( A * C * (B - C) * (B + C) * Pi |

seed.LeftPadding('5', 4).substr(0, 4)

7) Validation checks each character against possible ranges defined in 2) - 5)

8) Certification performs validation first, then verification


---------Sample GC numbers (and their verification codes) generated based on this ruleset:

DBBGD-G31F3-JVVFD-UD8HB   (3518)<br>

CGGCG-ZG3ZC-4JZB9-6P9FO   (4398)

GBGBG-ZZZB7-NT2XR-28PY9   (7539)

BBGBC-CC53E-P22BL-6M228   (7916)

AGAGA-9FFG1-BZBF4-F6H28   (3619)

EDGFB-AFYZA-FH6RY-448H4   (4948)

FFEBB-9Z5A5-JHFA6-D8BVY   (6911)

GCBBE-7F3YY-ZA6T9-HDJ88   (8293)

BGFGB-BX3ZD-4JFTP-H22S4   (3298)

BCFEF-F93Z3-FLTB6-9OO29   (5792)


Possible Future Improvements
----------------------------


1) Read ruleset from a configuration file

2) Ability to specify a ruleset for GC generation 

3) Optimization of the script

4) Test suites

Security Concerns
-----------------

This is a demostration of a pre-packaged solution for gift-card generation and certification.  While the rulesets can be recovered through decompilation and decoding, the security can be enhanced through the following:

1) NOT hosting it on a public-facing web server (an obvious one)

2) implementing additional layer to deter multiple attempts (delay of 5 seconds after each failed attempt, completely void the gift card after X number of 
attempts)

3) binding gift card number with its value in an external database (this has its own security loopholes

4) designing a different ruleset for different value classes ( $5, $10, $15, $25, etc)

5) pre-generating numbers and store them in a database

6) anything else?

Disclaimer
----------

This project shall NOT be used for cracking/generating codes for any gift card currently in the market (Amazon, Facebook, iTunes, etc).  The author assumes NO liability for such illegal use of the code.