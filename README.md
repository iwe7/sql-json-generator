[![npm version](https://badge.fury.io/js/sql-json-generator.svg)](https://badge.fury.io/js/sql-json-generator)

# sql-json-generator

Generate SQL command from JSON object

## Install

Install with `npm install sql-json-generator`

```
var SQLGenerator = require('sql-json-generator');
var sqlGenerator = new SQLGenerator();
```

## API

### SELECT

`.select( queryData )`

The first parameter contains the data used to produce the SQL query.
The function returns a string with the SQL. In case of error, will return ``null``

```
sqlParams = {
    $select : {
        $from : 'table1',
        $fields : [
            'column_a',
            'column_b',
            'column_c'
        ]
    },
    $where : {
        column_d: 1
    }
}

sqlGenerator.update( sqlParams);
```

will return:

```
SELECT `column_a`, `column_b`, `column_c` FROM `table1` WHERE `column_d` = '1'
```


### INSERT

`.insert( queryData )`

The first parameter contains the data used to produce the SQL query.
The function returns a string with the SQL. In case of error, will return ``null``

```
sqlParams = {
    $insert: 'mytable',
    $values : {
        column_a: 1,
        column_b: 1
    }
}

sqlGenerator.update( sqlParams);
```

will return:

```
INSERT INTO `mytable` (`column_a`,`column_b`) VALUES ('1','1')
```

### UPDATE

`.update( queryData )`

The first parameter contains the data used to produce the SQL query.
The function returns a string with the SQL. In case of error, will return ``null``

```
sqlParams = {
    $update: 'mytable',
    $set : {
        column_b: 1
    },
    $where: {
        column_a: 1
    }
}

sqlGenerator.update( sqlParams);
```

will return:

```
UPDATE  `mytable`  SET `column_b` = '1' WHERE `column_a` = '1'
```

> ``$where`` parameter is optional

### DELETE

`.delete( queryData )`

The first paramenter contains the data used to produce the SQL query.
The function returns a string with the SQL. In case of error, will return ``null``

```
sqlParams = {
    $delete: 'mytable',
    $where: {
        column_a: 1
    }
}

sqlGenerator.delete( sqlParams);
```

will return:

```
UPDATE  `mytable`  SET `column_b` = '1' WHERE `column_a` = '1'
```

> ``$where`` parameter is optional





## Formating queryData

### $select

``$where: { params... }``

#### $from, $fields, $field: basic FROM query

Columns to be displayed in a SELECT statement are elements of an array. It can be just an array of columns names
```
{
    $from : 'table1',
    $fields : [
        'column_a',
        'column_b'
    ]
}
```
will return:

```
SELECT `table1`.`column_a`, `table1`.`column_b` FROM `table1`
```

To apply extra SQL formats to the colums (such as AS, SUM) the column must be wrapped in an object:

```
{
    $from : 'table1',
    $fields : [
        {
            $field: 'column_a'
        },
        {
            $field: 'column_b'
        },
    ]
}
```
will return:

```
SELECT `table1`.`column_a`, `table1`.`column_b` FROM `table1`
```

#### $as

```
{
    $from : 'table1',
    $fields : [
        {
            $field: 'column_a',
            $as: 'column_a_as'
        },
        'column_b'
    ]
}
```
will return:

```
SELECT `table1`.`column_a` AS column_a_as, `table1`.`column_b` FROM `table1`
```





### $where

``$where: { conditions... }``

#### Logical Operators: $and and $or

*Syntax:* ``{ $and : [{condition1}, {condition2}... ]}`` , ``{ $or : [{condition1}, {condition2}... ]}``

```
{
    $or : [
        {column_a: 1},
        {column_b: 1}
    ]
}
```
will return:

```
(column_a = '1' OR column_b = '1')
```

##### default behavior: $and

```
{
    column_a: 1,
    column_b: 1,
    column_c: 1
}
```

will return:

```
column_a = '1' AND column_b = '1' AND column_c = '1'
```

#### Comparaison Operators


|    JSON  |     SQL       |
|----------|:-------------:|
| ``$gt`` | ``>`` |
| ``$gte`` |    ``>=``   |
| ``$lt`` |    ``<``   |
| ``$lte`` |    ``<=``   |
| ``$eq`` |    ``=``   |
| ``$ne`` |    ``<>``   |

*Syntax:* ``{ column : { $gt : value }}``

```
{
    column_a: {
        $gt: 1
    }
}
```


will return:

```
column_a > '1'
```