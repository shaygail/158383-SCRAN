from unicodedata import category
import pandas as pd
import pytrends
from pytrends.request import TrendReq
import seaborn as sns

pytrends = TrendReq()

# For the future, it should be input the keywords from the website.
keywords_list=['Supply chain', 'Sourcing', 'Logistics', 'Purchase', 'Warehouse']

keywords_codes=[pytrends.suggestions(keyword=i)[0] for i in keywords_list]
df_codes=pd.DataFrame(keywords_codes)
#print(df_codes)

exact_keywords=df_codes['mid'].to_list()
date_interval='2022-01-01 2022-09-01'
COUNTRY=['NZ']
CATEGORY=0
SEARCH_TYPE=''

Individual_EXACT_KEYWORD=list(zip(*[iter(exact_keywords)]*1))
Individual_EXACT_KEYWORD=[list(x) for x in Individual_EXACT_KEYWORD]
dicti={}
i=1
for country in COUNTRY:
    for keyword in Individual_EXACT_KEYWORD:
        pytrends.build_payload(kw_list=keyword,
                                timeframe=date_interval,
                                geo=country,
                                cat=CATEGORY,
                                gprop=SEARCH_TYPE)
        dicti[i]=pytrends.interest_over_time()
        i+=1
df_trends=pd.concat(dicti, axis=1)
print(df_trends)

df_trends.columns=df_trends.columns.droplevel(0) #Drop outside header
df_trends=df_trends.drop('isPartial', axis=1) #Drop 'isPartial'
df_trends.reset_index(level=0, inplace=True)
df_trends.columns=['date', 'Supply chain-NZ', 'Sourcing-NZ', 'Logistics-NZ', 'Purchase-NZ', 'Warehouse-NZ']

#print(df_trends)

import plotly.graph_objects as go

line1 = go.Scatter(x=df_trends['date'], y=df_trends['Supply chain-NZ'], name='Supply chain-NZ')
line2 = go.Scatter(x=df_trends['date'], y=df_trends['Sourcing-NZ'], name='Sourcing-NZ')
line3 = go.Scatter(x=df_trends['date'], y=df_trends['Logistics-NZ'], name='Logistics-NZ')
line4 = go.Scatter(x=df_trends['date'], y=df_trends['Purchase-NZ'], name='Purchase-NZ')
line5 = go.Scatter(x=df_trends['date'], y=df_trends['Warehouse-NZ'], name='Warehouse-NZ')
fig = go.Figure([line1, line2, line3, line4, line5])
fig.update_layout(
    title='Supply Chain Trending on Google Trends (New Zealand)',
    xaxis_title='Date',
    yaxis_title='Value'
)
fig.show()

fig.write_html('supplychaintrends2022.html')