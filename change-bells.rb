#!/usr/bin/ruby

def getIdentifier(line)
    matched = line.match(/"identifier": "(.*)"/)
    return nil if matched.nil?
    return matched.captures[0]
end

def getName(line)
    matched = line.match(/"name": "(.*)"/)
    return nil if matched.nil?
    return matched.captures[0]
end

def getBells(line)
    matched = line.match(/"bells": (.*)/)
    return nil if matched.nil?
    return matched.captures[0].to_i
end

def import(path, to:)
    content = File.read(path)

    result = ""
    for line in content.lines do
        identifier = getIdentifier(line) || identifier
        name = getName(line) || name
        bells = getBells(line)
        result += "#{identifier},#{name},#{bells}\n" unless bells.nil?
    end

    File.write(to, result)
end

def export(tmpPath, to:)
    result = File.read(tmpPath)

    rebasing = false
    loop do
        dirty = false
        identifier = ""

        lines = File.read(to).lines.map { |line|
            next line if dirty

            identifier = getIdentifier(line) || identifier
            next line unless line =~ /bells/

            bells = result.lines.find { |line| line.include?(identifier) }.strip.split(",")[2]
            line2 = line.sub(/(?<="bells": ).*(?=,)/, bells)
            next line if line == line2

            dirty = true
            next line2
        }

        break unless dirty

        content = lines.join()
        File.write(to, content)
        system("git add #{to} && git commit --fixup=:/#{identifier.sub(/-[a-zA-Z]+$/, '')}")
        rebasing = true
    end

    system("git rebase -i :/init") if rebasing
end

def run(category)
    tmpPath = "./#{category}.csv"
    path = "./src/models/#{category}/index.json"

    if File.exist?(tmpPath) then
        export(tmpPath, to: path)
        system("rm -i #{tmpPath}")
    else
        import(path, to: tmpPath)
    end
end

run("items")