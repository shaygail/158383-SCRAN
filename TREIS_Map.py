import requests
from pyproj import Transformer
transformer = Transformer.from_crs(27200, 4326)


def build_kml(events) -> str:
    kml = open('base.kml', 'rt').read()
    placemarks = ''
    for ev in events:
        placemarks += build_placemark(ev) + '\n'
    return kml.format(placemarks=placemarks)


def parse_geom(ev) -> str:
    """Attempt to Parse Points or Polys"""
    gstring = ev.find('tns:wktGeometry')
    if gstring:
        dat = gstring.string.split(';')[-1]
        if dat.startswith('MULTILINESTRING'):
            # do a line string.
            # walk through all points in string
            p = 15
            pt = []
            coords = []
            vl = 0
            # , 2653993.604526806 6537429.731653828,
            for i in range(15, len(dat)):
                if dat[i] in '-01234567890.':
                    vl = vl + 1
                elif dat[i] in [' ', '(', ')', ',']:
                    if vl > 0:
                        if len(pt) < 2:
                            pt.append(dat[p:p + vl])
                        else:
                            exit(1)
                            pass
                        vl = 0
                    p = i + 1

                if len(pt) == 2:
                    try:
                        coords.append(transformer.transform(pt[0], pt[1]))
                    except:
                        print('Failed at PT: ', pt)
                        exit(1)
                    pt = []

            cstring = ''
            for cv in coords:
                cstring += f'{cv[1]},{cv[0]},0 '
            return f"<MultiGeometry><LineString><extrude>0</extrude><altitudeMode>clampedToGround</altitudeMode" \
                   f"><coordinates>{cstring.strip()}</coordinates></LineString></MultiGeometry> "

        elif dat.startswith('POINT'):
            # do a single point.
            dat = dat.split('(')[-1][:-1]  # get the actual data string
            coords = dat.split(',')
            cstring = ''
            for coord in coords:
                pt = coord.split(' ')
                cv = transformer.transform(pt[0], pt[1])
                cstring += f'{cv[1]},{cv[0]},0 '
            return f"<Point><coordinates>{cstring}</coordinates></Point>"
    return ''


STYLES = {
    'Delays': 'delays',
    'Caution': 'caution',
    'Road Closed': 'roadClosed'
}


def build_placemark(ev) -> str:
    geom = parse_geom(ev)
    flds = 'status,eventIsland,eventDescription,eventType,expectedResolution,impact,planned,restrictions,startDate,' \
           'endDate,informationSource,supplier,eventCreated,eventModified,eventComments,locationArea,' \
           'alternativeRoute,eventId '
    flds = {f: ev.find(f'tns:{f}') for f in flds.split(',')}
    fdat = {k: '' if v is None else v.string for k, v in flds.items()}
    fdat = {k: '' if v is None else v.replace('&', 'and') for k, v in fdat.items()}
    fdat['geom'] = geom
    style = fdat['impact']
    fdat['style'] = STYLES[style] if style in STYLES else 'caution'
    pmk = open('placemark.xml', 'rt').read().format(**fdat)
    return pmk


def process(xml) -> str:
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(xml, "xml")
    kml = build_kml(soup.find_all("tns:roadEvent"))
    return kml


def get_data():
    url = 'https://infoconnect1.highwayinfo.govt.nz/ic/jbi/TREIS/REST/FeedService/'
    headers = {
        'username': 'm.marsden',
        'password': '16Waipororo'
    }
    resp = requests.get(url=url, headers=headers)
    if resp.status_code == 200:
        print('success')
        # print(process(resp.text))
        open("waka.kml", "wt").write(process(resp.text))
    else:
        print('failed!', resp.text)


if __name__ == '__main__':
    get_data()
    pass




