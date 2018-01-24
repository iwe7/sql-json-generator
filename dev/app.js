/**
 * Created by manu on 12/08/2016.
 */
var colors = require('colors');
var SQLGenerator = require('../index');

var sqlGenerator = new SQLGenerator({ debug: true, pgSQL: true });

var queryParams ={
    $from: 'iab_cidadao',
    $fields: [,
        'nr_cartao_sus',
        {
            $inner: 'grl_pessoa',
            $on: {
                $parent: 'cd_cidadao',
                $child: 'cd_pessoa'
            },
            $fields: [
                'nm_pessoa'
            ],
            $where: [{
                $field : 'nm_pessoa',
                $like: '%EMMA%'
            }]
        }
    ],
    $where: [],
    $order: [{
        $field: 'nm_pessoa',
        $table: 'grl_pessoa',
    }]
};


var sqlQuery = sqlGenerator.select(queryParams);

